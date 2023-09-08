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
            this.toggleSections(buttonWithKey)
        }
    }
    
    toggleSections(target) {
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
        const toggleTargets = target.getAttribute("data-togglable").split(",")
        const activateTabsBody = (containerClass) => {
            this.root.querySelectorAll("." + containerClass + " *[data-togglable]")
                .forEach(child => {
                        if (toggleTargets.includes(child.getAttribute("data-togglable"))) {
                            child.setAttribute("data-active", "")
                        } else if(!child.classList.contains("sourceset-dependent-content")) { // data-togglable is used to switch source set as well, ignore it
                            child.removeAttribute("data-active")
                        }
                })
        }
        activateTabs("tabs-section")
        activateTabsBody("tabs-section-body")
    }
    
    toggleSectionsEventHandler(evt) {
        if (!evt.target.getAttribute("data-togglable")) return
        localStorage.setItem('active-tab', JSON.stringify(evt.target.getAttribute("data-togglable")))
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