export default class SetupHelper {

    constructor(root) {
        this.root = root
    }

    setup() {
        this.root.querySelectorAll("div[data-platform-hinted]")
            .forEach(elem => elem.addEventListener('click', (event) => this.togglePlatformDependent(event, elem)))
        this.root.querySelectorAll("div[tabs-section]")
            .forEach(elem => elem.addEventListener('click', (event) => this.toggleSectionsEventHandler(event)))
        this.initTabs()
    }
    
    initTabs() {
        this.root.querySelectorAll("div[tabs-section]")
            .forEach(element => {
                this.showCorrespondingTabBody(element)
                element.addEventListener('click', (event) => this.toggleSectionsEventHandler(event))
            })
        let cached = localStorage.getItem("active-tab")
        if (cached) {
            let parsed = JSON.parse(cached)
            let tab = this.root.querySelector('div[tabs-section] > button[data-togglable="' + parsed + '"]')
            if (tab) {
                this.toggleSections(tab)
            }
        }
    }
    
    showCorrespondingTabBody(element) {
        const buttonWithKey = element.querySelector("button[data-active]")
        if (buttonWithKey) {
            const key = buttonWithKey.getAttribute("data-togglable")
            this.root.querySelector(".tabs-section-body")
                .querySelector("div[data-togglable='" + key + "']")
                .setAttribute("data-active", "")
        }
    }
    
    toggleSections(target) {
        localStorage.setItem('active-tab', JSON.stringify(target.getAttribute("data-togglable")))
        const activateTabs = (containerClass) => {
            for (const element of this.root.querySelectorAll(containerClass)) {
                for (const child of element.children) {
                    if (child.getAttribute("data-togglable") === target.getAttribute("data-togglable")) {
                        child.setAttribute("data-active", "")
                    } else {
                        child.removeAttribute("data-active")
                    }
                }
            }
        }
    
        activateTabs(".tabs-section")
        activateTabs(".tabs-section-body")
    }
    
    toggleSectionsEventHandler(evt) {
        if (!evt.target.getAttribute("data-togglable")) return
        this.toggleSections(evt.target)
    }
    
    togglePlatformDependent(e, container) {
        let target = e.target
        if (target.tagName != 'BUTTON') return;
        let index = target.getAttribute('data-toggle')
    
        for (let child of container.children) {
            if (child.hasAttribute('data-toggle-list')) {
                for (let bm of child.children) {
                    if (bm == target) {
                        bm.setAttribute('data-active', "")
                    } else if (bm != target) {
                        bm.removeAttribute('data-active')
                    }
                }
            } else if (child.getAttribute('data-togglable') == index) {
                child.setAttribute('data-active', "")
            } else {
                child.removeAttribute('data-active')
            }
        }
    }

}