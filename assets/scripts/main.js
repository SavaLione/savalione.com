const light_mode_name = 'Light mode';
const dark_mode_name = 'Dark mode';
check_theme_and_preferences();
update_html_element(get_theme());

document.addEventListener("DOMContentLoaded", () => {
    init();
});

const init = () => {
    const darkSwitchesArray = document.querySelectorAll('.dark-light-switch');
    darkSwitchesArray.forEach(darkSwitch => {
        if(get_theme() == "dark")
            darkSwitch.innerHTML = light_mode_name;
        else
            darkSwitch.innerHTML = dark_mode_name;
        darkSwitch.addEventListener('click', toggle_theme);
    });
};

function check_theme_and_preferences()
{
    switch (get_theme())
    {
        case "light":
        case "dark":
            break;
        case null:
            if(window.matchMedia("(prefers-color-scheme: dark)").matches)
                set_theme("dark");
            else
                set_theme("light");
            break;
        default:
            set_theme("light");
            break;
    }
}

const toggle_theme = () => {
    switch (get_theme())
    {
        case "light":
            set_theme("dark");
            break;
        case "dark":
            set_theme("light");
            break;
        default:
            set_theme("light");
            break;
    }

    const darkSwitchesArray = document.querySelectorAll('.dark-light-switch');
    darkSwitchesArray.forEach(darkSwitch => {
        if(get_theme() == "dark")
            darkSwitch.innerHTML = light_mode_name;
        else
            darkSwitch.innerHTML = dark_mode_name;
    });
    update_html_element(get_theme());
};

function update_html_element(theme)
{
    document.querySelector("html").setAttribute("data-theme", theme);
}

function set_theme(theme)
{
    localStorage.setItem("theme", theme);
}

function get_theme()
{
    return localStorage.getItem("theme");
}

// The post scroll bar on top of posts
let scrollPercent;
let scrollListener = () => {
    let scrollTop = document.documentElement["scrollTop"] || document.body["scrollTop"];
    let scrollBottom = (document.documentElement["scrollHeight"] ||
        document.body["scrollHeight"]) - document.documentElement.clientHeight;
    scrollPercent = scrollTop / scrollBottom * 100 + "%";
    let progress = document.getElementById("_progress");
    progress && progress.style.setProperty("--scroll", scrollPercent);
};
document.addEventListener("scroll", scrollListener, { passive: true });
