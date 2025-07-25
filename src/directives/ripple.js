export default {
    mounted: (el, binding) => {
        el.classList.add('ripple-btn');
        isolateText(el);
        setupRipple(el, binding);
    },
    updated: (el, binding) => {
        isolateText(el);
        if (el.innerText === '') {
            el.removeEventListener('click', el._rippleHandler)
            setupRipple(el, binding);
        }
    },
}


const setupRipple = (el, binding) => {
    const { bgColor, expand = 1.5, opacity = 0, duration = '600ms', remain = false, disabled = false } = binding.value || {};

    const handler = (event) => {
        const ripple = el.querySelector('.ripple-effect');
        if (!ripple || !remain) {
            const circle = document.createElement("span");
            const diameter = Math.max(el.clientWidth, el.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${event.clientX - el.offsetLeft - radius}px`;
            circle.style.top = `${event.clientY - el.offsetTop - radius}px`;

            if (bgColor) circle.style.setProperty('--ripple-bg', bgColor);
            circle.style.setProperty('--scale', expand);
            circle.style.setProperty('--opacity', opacity);
            circle.style.setProperty('--duration', duration);
            circle.style.setProperty('--remain', remain);
            if (!remain) circle.addEventListener('animationend', () => circle.remove());
            circle.classList.add('ripple-effect');

            el.appendChild(circle);
        }
    }

    if (!disabled) {
        el._rippleHandler = handler;
        el.addEventListener("click", handler);
    }
}

const isolateText = (el) => {
    let textSpan = el.querySelector('.text');
    const texts = Array.from(el.childNodes).filter(item => item.nodeType === Node.TEXT_NODE);

    if (!textSpan && texts.length > 0) {
        textSpan = document.createElement("span");
        textSpan.classList.add('text');
        texts.forEach((item) => textSpan.innerText += item.data);

        texts.forEach(item => item.remove());
        el.appendChild(textSpan);
    }
}