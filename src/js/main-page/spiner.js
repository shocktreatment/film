import { Loading } from 'notiflix';

export function loadingSpiner() {
    Loading.standard('Loading...', {
        backgroundColor: 'rgba(0,0,0,0.8)',
        svgColor: '#FF6B08',
        messageColor: '#FF6B08'
});
}