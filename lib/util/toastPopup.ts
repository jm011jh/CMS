export default function activeToastPopup(el : any, color: string = "blue") {
    const howlongForShow = 2000;
    const duration = 500;
    const card = document.createElement('div');
    card.classList.add('toast-popup');
    card.classList.add(color);
    card.style.transitionDuration = `${duration}ms`;
    card.innerHTML = el;
    document.body.appendChild(card);
    setTimeout(()=>{
        card.classList.add('active')
    },100)
    setTimeout(() => {
        card.classList.remove('active');
        setTimeout(() => {
            card.remove();
        }, duration + 10);
    }, howlongForShow);
}