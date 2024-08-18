import './Header.css'
import MarvelLogo from '../assets/marvel'

export function Header() {
    return (
        <header>
            <div id="title-page">
                <MarvelLogo className="marvel-logo"/>
                <h1> Memory Card Game</h1>
            </div>
            <div id="fetching">
                <label htmlFor="fetch-bool">Fetching (slower)</label>
                <input type="checkbox" id='fetch-bool' />
            </div>
            
        </header>
    )
}