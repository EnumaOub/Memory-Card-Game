import { DialogModal } from "./DialogModal"

export function StartGame({ gameCallback }) {
    function btnCallback() {
        const rulesModal = document.getElementById("rules");
        const startModal = document.getElementById("start-modal");
        startModal.close();
        const number = document.getElementById("diff-select").value
        gameCallback(number);
    }

    return (
        <DialogModal
            openN={false}
            name="start-modal"
            content={
                <form>
                    <label htmlFor="diff-select">Choose a difficulty:</label>

                    <select name="diff" id="diff-select">"start"
                    <option value="3">Easy</option>
                    <option value="6">Normal</option>
                    <option value="9">Difficult</option>
                    </select>
                </form>
            }
            callbackBtn={btnCallback}
        ></DialogModal>
    )
};

