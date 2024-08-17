import { DialogModal } from "./DialogModal"

export function EndGame() {
    function btnCallback() {
        const rulesModal = document.getElementById("rules");
        const startModal = document.getElementById("start");
        const endModal = document.getElementById("end-dialog");
        endModal.close()
        startModal.showModal();
    }

    return (
        <DialogModal
            openN={false}
            name="end-dialog"
            content={
                <h1>ENd GAME: RESTART ?</h1>
            }
            callbackBtn={btnCallback}
        ></DialogModal>
    )
}