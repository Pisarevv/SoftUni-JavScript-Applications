export function initialize(links) {

    let main = document.querySelector('main');
    let nav = document.querySelector('nav');

    nav.addEventListener('click', onNavigate);

    let context = {
        showSection,
        goTo,
        updateNav
    }

    return context;
    

    function showSection(section) {
        main.replaceChildren(section);
    }

    function onNavigate(e) {
        e.preventDefault();
        let target = e.target;
        if (target.tagName == "A") {
            let url = new URL(target.href);
            let name = url.pathname;
            goTo(name);
        }
 
    }

    function goTo(name) {
        let handler = links[name];
        if (typeof handler == "function") {
            handler(context);
        }
    }

    function updateNav() {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            document.querySelector('#welcome-msg').textContent = `Welcome ${user.email}`
            document.querySelectorAll('.user').forEach(x => x.style.display = 'block');
            document.querySelectorAll('.guest').forEach(x => x.style.display = 'none');
        }
        else {
            document.querySelectorAll('.user').forEach(x => x.style.display = 'none');
            document.querySelectorAll('.guest').forEach(x => x.style.display = 'block');
        }
    }
}