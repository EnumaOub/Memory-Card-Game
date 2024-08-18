import './Header.css'

export function Header() {
    return (
        <header>
            <div id="title-page">
                <h1>Card Game</h1>
            </div>
            <div id="fetching">
                <label htmlFor="fetch-bool">Fetching (slower)</label>
                <input type="checkbox" id='fetch-bool' defaultChecked />
            </div>
            
        </header>
    )
}