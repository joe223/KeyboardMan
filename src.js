export default class KeyboardMan {
    constructor (config = {}) {
        const {
            timeout
        } = config
        this.timeout = timeout || 1200
        this.init()
    }

    parser (scheme) {
        const reg = /\((.*?)\)/
        const rule = scheme.split('+').map(step => {
            return step.split('&').map(item => {
                let group = item.match(reg)
                group = group ? group[1] : group
                return {
                    key: (group ? group : item).split('|')
                }
            })
        })
        return rule
    }

    exec (scheme, cb) {
        let steps = this.steps.slice(-scheme.length)
        let match = true
        for (let groupIndex = 0; groupIndex < scheme.length; groupIndex++) {
            if (!match) break
            for (let stepIndex = 0; stepIndex < scheme[groupIndex].length; stepIndex++) {
                if (!steps[groupIndex] || !steps[groupIndex][stepIndex]) {
                    match = false
                    break
                }
                const key = steps[groupIndex][stepIndex]
                const keys = scheme[groupIndex][stepIndex].key
                if (!scheme[groupIndex][stepIndex].key.includes(key)) {
                    match = false
                    break
                }
            }
        }
        if (match) cb()
    }

    flush () {
        clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(() => {
            this.init()
        }, this.timeout)
    }

    init () {
        this.steps = []
        this.step = []
        this.count = 0
        this.last = null
        this.steps.push(this.step)
    }

    on (str, cb) {
        const scheme = this.parser(str)
        document.addEventListener('keydown', e => {
            let { step, last } = this
            const keyCode = e.keyCode
            if (keyCode !== last) {
                this.last = e.keyCode
                this.count++
                step.push(e.key)
                this.exec(scheme, cb)
            }
        })
        document.addEventListener('keyup', e => {
            let { steps } = this
            this.count--
            if (this.count < 1) {
                steps.push(this.step = [])
                this.flush()
            }
            this.last = null
        })
        return scheme
    }
}
function clone (ob) {
    return JSON.parse(JSON.stringify(ob))
}