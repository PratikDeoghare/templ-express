
class A {
    private name: string;
    private kids: A[] = [];
    private dad?: A;
    private attr: [string, string][] = []
    constructor(name: string, ...kids: A[]) {
        this.name = name
        this.kids = kids || []
    }

    y(key: string, val: string) {
        this.attr.push([key, val])
        return this
    }

    render(): string {
        if (this.name.startsWith('text!!!')) {
            return this.name.slice(7)
        }

        let xs: string[] = []
        xs.push(`<${this.name} ${toStr(this.attr)}>`)
        for (const k of this.kids) {
            xs.push(k.render())
        }
        xs.push(`</${this.name}>`)
        return xs.join('\n')

    }
}

function toStr(ps: [string, string][]): string {
    let xs: string[] = []
    for (const p of ps) {
        xs.push(`${p[0]}="${p[1]}"`)
    }
    return xs.join(' ')
}

const x = (name: string, ...kids: A[]) => new A(name, ...kids)
const t = (text: string) => new A(`text!!!${text}`)

function IfElse(cond: boolean, ifCase: A, elseCase: A) {
    if (cond) {
        return ifCase
    } else {
        return elseCase
    }
}

const lang = () => Math.random() < 0.5 ? 'en' : 'de'

const oneTwoThree = IfElse(lang() === 'de',
    x('ol',
        x('li', t('eins')),
        x('li', t('zwei')),
        x('li', t('drei'))
    ),
    x('ul',
        x('li', t('one')),
        x('li', t('two')),
        x('li', t('three'))
    )
);

const helloWorld = (name: string) =>
    x('p',
        t(`${name}'s pugs source code!`))

interface Book {
    Name: string;
    Author: string;
    Price: number;
}

const books: Book[] = [
    {
        Name: 'LOTR',
        Author: 'J R R Tolkein',
        Price: 422.55,
    },
    {
        Name: 'Harry Potter',
        Author: 'J K R Rollling',
        Price: 212.55,
    },
    {
        Name: 'Fantastic Little Software',
        Author: 'P R R R R Atik',
        Price: 32212.55,
    },
    {
        Name: 'Hacks',
        Author: 'P R R R R Deogha R R R R R åé',
        Price: 4212.55,
    }
]

const bookEntry = (b: Book) => x('tr',
    x('td', t(b.Name)),
    x('td', t(b.Author)),
    x('td', t(`${b.Price}`)),
)

import * as fs from 'fs';

// Calling the readFileSync() method
// to read 'input.txt' file
const data = fs.readFileSync('./index.ts',
    { encoding: 'utf8', flag: 'r' });

function escapeHtml(txt: string) {
    return txt
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function nLevelList(n: number): A {
    if (n > 0) {
        return x('ul',
            x('li', t(`${n}`)),
            x('li', nLevelList(n - 1)))
    }
    return t('I AM HERE!')
}

const r =
    x('html',
        x('body',

            x('br'),

            t('a list of numbers'),

            oneTwoThree,

            IfElse(lang() === 'de',
                x('ol',
                    x('li', t('eins')),
                    x('li', t('zwei')),
                    x('li', t('drei'))
                ),
                x('ul',
                    x('li', t('one')),
                    x('li', t('two')),
                    x('li', t('three'))
                )
            ),

            x('h2', t('big letters!')),

            helloWorld('John'),

            x('a', t('click me'))
                .y('href', 'https://www.spaceteams.de/de'),


            ...'quick brown fox jumps over the lazy dog'.split(' ').map(
                (w) => helloWorld(w)
            ),


            x('pre', t(`
                func fibonacci(n int) int { 
                    if n < 2 { 
                        return 1 
                    }
                    return fibonacci(n-1) + fibonacci(n-2)
                }
            
            `)).y('left-margin', '200px'),

            x('table', ...books.map(bookEntry))
                .y('border', '10px'),

            nLevelList(15),

            x('pre', t(data))
                .y('style', 'margin-left:50px;background-color:pink')

        ).y('style', 'background-color:#ffffee;')
    )

console.log(r.render())