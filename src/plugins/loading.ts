// @unocss-include

export function setupLoading() {
  const loading = `<div class="loader">
        <svg class="absolute" width="0" height="0">
            <defs>
                <linearGradient id="b" x1="0" y1="62" x2="0" y2="2" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#973BED"></stop>
                    <stop offset="1" stop-color="#007CFF"></stop>
                </linearGradient>
                <linearGradient id="c" x1="0" y1="64" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFC800"></stop>
                    <stop offset="1" stop-color="#F0F"></stop>
                    <animateTransform attributeName="gradientTransform" type="rotate"
                        values="0 32 32;-270 32 32;-540 32 32;-810 32 32;-1080 32 32" dur="8s"
                        keyTimes="0;0.125;0.25;0.375;0.5;0.625;0.75;0.875;1" repeatCount="indefinite">
                    </animateTransform>
                </linearGradient>
                <linearGradient id="d" x1="0" y1="62" x2="0" y2="2" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#00E0ED"></stop>
                    <stop offset="1" stop-color="#00DA72"></stop>
                </linearGradient>
            </defs>
        </svg>

        <!-- Letter B -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360"
                d="M2 10H20C25 10 30 13 30 18C30 21 28 23 25 24C28 25 30 27 30 30C30 35 25 38 20 38H2V10ZM10 16V21H18C20 21 22 20 22 18.5C22 17 20 16 18 16H10ZM10 27V32H18C20 32 22 31 22 29.5C22 28 20 27 18 27H10Z"
                class="dash gradient-b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Letter L -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360" d="M2 10H10V32H30V38H2V10Z" class="dash gradient-b" stroke-width="4"
                stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Letter U -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360"
                d="M2 10H10V30C10 31 11 32 16 32C21 32 22 31 22 30V10H30V30C30 35 25 38 16 38C7 38 2 35 2 30V10Z"
                class="dash gradient-c" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Letter E -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360" d="M2 10H30V16H10V21H25V27H10V32H30V38H2V10Z" class="dash gradient-c"
                stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Space -->
        <div class="w-4"></div>

        <!-- Letter A -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360" d="M2 38V10H30V38H22V28H10V38H2ZM10 16V22H22V16H10Z" class="dash gradient-d"
                stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Letter R -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360"
                d="M2 10H20C25 10 30 13 30 18C30 23 25 26 20 26L30 38H22L13 26H10V38H2V10ZM10 16V20H18C20 20 22 19 22 18C22 17 20 16 18 16H10Z"
                class="dash gradient-d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Letter C -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360"
                d="M30 14C27 11 23 10 16 10C9 10 2 15 2 24C2 33 9 38 16 38C23 38 27 37 30 34V27H20V21H30V14Z"
                class="dash gradient-b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Letter H -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360" d="M2 10H10V21H22V10H30V38H22V27H10V38H2V10Z" class="dash gradient-b"
                stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Letter I -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360" d="M2 10H30V16H20V32H30V38H2V32H12V16H2V10Z" class="dash gradient-c" stroke-width="4"
                stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Letter V -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360" d="M2 10H10L16 30L22 10H30L20 38H12L2 10Z" class="dash gradient-c" stroke-width="4"
                stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <!-- Letter E -->
        <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path pathLength="360" d="M2 10H30V16H10V21H25V27H10V32H30V38H2V10Z" class="dash gradient-d"
                stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        <div class="w-2"></div>
</div>
<style>
.loader {
position: fixed;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
background-color: #f0f0f0;
z-index: 999;
}

.loader svg {
margin: 0 5px;
width: 64px;
height: 64px;
}

.absolute {
position: absolute;
}

.inline-block {
display: inline-block;
}

.w-2 {
width: 0.5em;
}

/* Animations */
.dash {
animation:
dashArray 2s ease-in-out infinite,
dashOffset 2s linear infinite;
}

.spin {
animation:
spinDashArray 2s ease-in-out infinite,
spin 8s ease-in-out infinite,
dashOffset 2s linear infinite;
transform-origin: center;
}

@keyframes dashArray {
0% {
stroke-dasharray: 0 1 359 0;
}

50% {
stroke-dasharray: 0 359 1 0;
}

100% {
stroke-dasharray: 359 1 0 0;
}
}

@keyframes spinDashArray {
0% {
stroke-dasharray: 270 90;
}

50% {
stroke-dasharray: 0 360;
}

100% {
stroke-dasharray: 270 90;
}
}

@keyframes dashOffset {
0% {
stroke-dashoffset: 365;
}

100% {
stroke-dashoffset: 5;
}
}

@keyframes spin {
0% {
transform: rotate(0deg);
}

12.5%,
25% {
transform: rotate(270deg);
}

37.5%,
50% {
transform: rotate(540deg);
}

62.5%,
75% {
transform: rotate(810deg);
}

87.5%,
100% {
transform: rotate(1080deg);
}
}

/* Dégradés */
.gradient-b {
stroke: url(#b);
}

.gradient-c {
stroke: url(#c);
}

.gradient-d {
stroke: url(#d);
}
</style>`;

  const app = document.getElementById('app');

  if (app) {
    app.innerHTML = loading;
  }
}
