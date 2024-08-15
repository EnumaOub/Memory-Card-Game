import { DialogModal } from "./DialogModal"

export function RulesGame() {
    function btnCallback() {
        const rulesModal = document.getElementById("rules");
        const startModal = document.getElementById("start");
        rulesModal.close();
        startModal.showModal();
    }

    return (
        <DialogModal
            openN={true}
            name="rules"
            content={<h1>Rules of the game.</h1>}
            callbackBtn={btnCallback}
        ></DialogModal>
    )
};

