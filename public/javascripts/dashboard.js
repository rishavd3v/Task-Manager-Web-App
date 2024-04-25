window.onload = function(){
    let navlink = window.location.pathname;
    let activeNav = document.querySelector(`a[href="${navlink}"]`);
    activeNav.classList.add('active');
}