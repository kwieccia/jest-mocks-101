export const openWindow = (url, name) => {
    window.open(url, name, "width=420,height=230,resizable");
}; 

export const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
}; 