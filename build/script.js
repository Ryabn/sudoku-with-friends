import './style.css'
import './sudoku-board.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

document.addEventListener("DOMContentLoaded", function(event) {
    let options = {};
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, options);
    createShare(window.location.href);
});
function createShare(link){
    let templ = `                
    <div id="copy-url">
        <i class="material-icons link-icon" onclick="navigator.clipboard.writeText('${link}'); M.toast({html: 'Link copied to clipboard!'});">link</i>
        <div>${link}</div>
    </div>
    Share your plan with your friends on social media
    <div class="icons">
        <a href="mailto:?Subject=Join My Plan&amp;Body=Join My Plan! ${link}" target="_blank">
        <img src="assets/gmail.jpg" alt="Email" />
        </a>
        <a href="http://www.facebook.com/sharer.php?u=${link}" target="_blank">
            <img src="assets/facebook.jpg" alt="Facebook" />
        </a>
        <a href="https://plus.google.com/share?url=${link}" target="_blank">
            <img src="assets/google.plus.jpg" alt="Google" />
        </a>
        <a href="https://twitter.com/share?url=${link}&amp;text=Join My Plan&amp;hashtags=planmysocial" target="_blank">
            <img src="assets/twitter.jpg" alt="Twitter" />
        </a>
    </div>
    `
    document.getElementById('share-urls').insertAdjacentHTML('beforeend', templ);
    shareModal();
}
function shareModal(){
    M.Modal.getInstance(document.getElementById('share-plan')).open();
}