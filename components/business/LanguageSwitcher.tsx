import {useTheme} from "next-themes";

export function LanguageSwitcher() {
    const { setTheme } = useTheme()
    return (
        <div>
            <select onChange={(e) => setTheme(e.target.value)}>
                <option value='dark'>dark</option>
                <option value='light'>light</option>
            </select>
        </div>
    );
}