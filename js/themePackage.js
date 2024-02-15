const themePackage =[
    {
        name:'BASIC',
        '--header-title': 'rgba(46, 48, 48, 0.63)',
        '--keyboard-bg-wrapper': '#ebeffa', 
        '--keyboard-bg-color': '#ebeffa', 
        '--keyboard-text-color': 'rgba(46, 48, 48, 0.63)',
        '--input-bg-color': 'rgb(237 241 250)', 
        '--input-shadow': 'inset 2px 3px 10px rgb(212, 212, 212), inset -4px -5px 7px rgb(255, 255, 255)',
        '--input-text-color':  'rgba(0, 0, 0, 0.596)',
        '--input-placeholder-color': ' rgba(122, 122, 122, 0.384)',
        '--keyboard-led': '#ce4141',
        '--keyboard-bg-container': 'rgb(11, 110, 190)',
        '--keyboard-shadow': '12px 15px 10px rgb(223, 222, 222),-2px -2px 10px rgb(223, 222, 222)',
        '--keyboard-border': '2px solid rgb(240, 244, 247)',
        '--keyboard-symbol-color': 'rgb(237, 241, 245)',
        '--keyboard-symbol-shadow': '2px 3px 10px rgb(204, 204, 204),-4px -5px 7px rgb(255, 255, 255)',
        '--keyboard-special-color': 'rgba(237, 241, 245, 0.5)',
        '--keyboard-symbol-hover':'rgb(218, 221, 224)',
        '--keyboard-symbol-active':'rgba(177, 187, 206, 0.315)',
        '--keyboard-special-hover':'rgba(217, 221, 225, 0.08)',
    },
    {
        name:'RED',
        '--header-title': 'rgba(212, 224, 224, 0.7)',
        '--keyboard-bg-wrapper': '#da848e', 
        '--keyboard-bg-color': '#e44a5b', 
        '--keyboard-text-color': 'rgba(255, 255, 255, 0.692)',
        '--input-bg-color': '#e44a5b', 
        '--input-shadow': 'inset 2px 3px 10px #a12b39, inset -4px -5px 7px #ff6c7d',
        '--input-text-color':  'rgba(241, 241, 241, 0.795)',
        '--input-placeholder-color':  'rgba(255, 255, 255, 0.432)',
        '--keyboard-led': '#2517ee',
        '--keyboard-bg-container': 'rgb(11, 110, 190)',
        '--keyboard-shadow': '12px 15px 10px #a12d3a,-2px -2px 10px #a12d3a',
        '--keyboard-border': '2px solid #b63140',
        '--keyboard-symbol-color': '#dd495a',
        '--keyboard-symbol-shadow': '2px 3px 10px #812833,-4px -5px 7px #ff697a',
        '--keyboard-special-color': '#2c2c2c77',
        '--keyboard-symbol-hover':'#fa7383',
        '--keyboard-symbol-active':'#bb7880ab',
        '--keyboard-special-hover':'#75757577',
    },
    {
        name:'BLUE',
        '--header-title': 'rgba(212, 224, 224, 0.7)',
        '--keyboard-bg-wrapper': 'hsl(244, 54%, 69%)',
        '--keyboard-bg-color': 'hsl(244, 74%, 59%)',
        '--keyboard-text-color': 'rgba(255, 255, 255, 0.692)',
        '--input-bg-color': 'hsl(244, 74%, 59%)',
        '--input-shadow': 'inset 2px 3px 10px hsl(244, 58%, 40%), inset -4px -5px 7px hsl(244, 100%, 71%)',
        '--input-text-color': 'rgba(241, 241, 241, 0.795)',
        '--input-placeholder-color': 'rgba(255, 255, 255, 0.432)',
        '--keyboard-led': '#FF0095',
        '--keyboard-bg-container': 'rgb(11, 110, 190)',
        '--keyboard-shadow': '12px 15px 10px hsl(244, 56%, 40%), -2px -2px 10px hsl(244, 56%, 40%)',
        '--keyboard-border': '2px solid hsl(244, 58%, 45%)',
        '--keyboard-symbol-color': 'hsl(244, 69%, 58%)',
        '--keyboard-symbol-shadow': '2px 3px 10px hsl(244, 53%, 33%), -4px -5px 7px hsl(244, 100%, 71%)',
        '--keyboard-special-color': 'hsla(219, 51%, 61%, 0.671)',
        '--keyboard-symbol-hover': 'hsl(244, 100%, 83%)',
        '--keyboard-symbol-active': 'hsla(229, 34%, 63%, 0.671)',
        '--keyboard-special-hover': '#7575759c',
    }
]
const MENU_COLOR_LED = document.querySelector('#cl-LED')


function changeCSSVar (a,b){
    document.documentElement.style.setProperty(a,b)
}

MENU_COLOR_LED.addEventListener('input',()=>{changeCSSVar('--keyboard-led', `${MENU_COLOR_LED.value}`)})

function changeTheme(event){
    if (event.target.closest('.menu__color_theme')){ 
        let themeName=event.target.closest('.menu__color_theme').getAttribute('data-themeName')
        let newTheme = themePackage.find(theme=> theme.name == themeName)
        for (const param in newTheme) {
            changeCSSVar(`${param}`,`${newTheme[param]}`)
        }
        MENU_COLOR_LED.value = newTheme["--keyboard-led"]
        console.log(MENU_COLOR_LED.value)
    }

}