class SnackMachine {
    snacks = [];
    purchases = [];

    addCategory = (name, price, amount = 0) => {
        if (this.categoryExists(name))
            logger(`${name} category already exists`)
        else {
            logger(`Added new snack category: '${name}'`)
            this.snacks.push({ name: name, pricePerItem: price, amount: amount })
            console.log(this.snacks)
        }
    }

    addItem = (name, amount) => {
        if (this.categoryExists(name) && amount > 0) {
            this.snacks.forEach(s => {
                if (s.name === name)
                    s.amount += amount
            });
            logger(`Added ${amount} items to "${name}" category`)
        }
        else
            logger(`No such snack category: "${name}"`)
    }

    purchase = (name) => {
        if (this.categoryExists(name)) {
            this.snacks.forEach(s => {
                if (s.name === name)
                    if (s.amount > 0) {
                        s.amount -= 1
                        this.purchases.some(p => p.name === name) ?
                            this.purchases.forEach(p => { if (p.name === name) p.amount += 1 }) :
                            this.purchases.push({ name: name, pricePerItem: s.pricePerItem, amount: 1, date: new Date() })
                        logger(`Bought 1 "${name}"`)
                        }
                    else logger(`Not enough "${name}" in machine`)
            }
            );
        }
        else
            logger(`No such snack category: '${name} `)
    }

    list = () => {
        logger('*******ALL SNACKS*******')
        this.snacks.length == 0 ? logger('No snacks added in machine yet') :
            this.snacks.sort((a, b) => a.amount > b.amount).forEach(s => logger(`> ${s.name} ${s.pricePerItem} $ ${s.amount} `))
        logger('***************************')
    }

    monthReport = (date) => {
        logger('*******MONTH REPORT*******')
        let report = this.purchases.filter(p => p.date.getMonth() === date.getMonth());
        report.length > 0 ? (report.forEach(r => logger(`> ${r.name} ${r.amount} `)), logger(`Total: ${this.getTotal(report)}`)) :
            logger('No snacks bought this month')
        logger('*****************************')
    }

    sinceDateReport = (date) => {
        logger('*******PERIOD REPORT*******')
        let report = this.purchases.filter(p => p.date.getDate() >= date.getDate());
        report.length > 0 ? (report.forEach(r => logger(`> ${r.name} ${r.amount} `)), logger(`Total: ${this.getTotal(report)}`)) :
            logger('No snacks bought during this period')
        logger('******************************')
    }

    clear = () => {
        this.snacks = this.snacks.filter(s => s.amount !== 0)
        console.log( this.snacks)
    }

    categoryExists = (name) => {
        return this.snacks.some(s => s.name == name)
    }

    getTotal = (arr) => {
        return Math.round((arr.reduce((acc, curr) => acc + (curr.pricePerItem * curr.amount), 0) + Number.EPSILON) * 100) / 100
    }
}

