const bottlePriceInput = document.getElementById("bottlePrice");
const bottleVolumeInput = document.getElementById("bottleVolume");
const pourVolumeInput = document.getElementById("pourVolume");
const shopPriceInput = document.getElementById("shopPrice");

const calculateButton = document.getElementById("calculateButton");
const clearButton = document.getElementById("clearButton");

const resultSection = document.getElementById("resultSection");

const pourVolumeResult = document.getElementById("pourVolumeResult");
const homePriceResult = document.getElementById("homePriceResult");

const homeBarValue = document.getElementById("homeBarValue");
const savingPerGlassInline = document.getElementById("savingPerGlassInline");
const shopBarValue = document.getElementById("shopBarValue");

const homeBarFill = document.getElementById("homeBarFill");
const savingBarBox = document.getElementById("savingBarBox");
const shopBarFill = document.getElementById("shopBarFill");

const bottleVolumeFormula = document.getElementById("bottleVolumeFormula");
const pourVolumeFormula = document.getElementById("pourVolumeFormula");

const glassesPerBottleResult = document.getElementById(
    "glassesPerBottleResult"
);

const glassesGrid = document.getElementById("glassesGrid");

const bottleCompareCount = document.getElementById(
    "bottleCompareCount"
);

const bottleHomeTotal = document.getElementById(
    "bottleHomeTotal"
);

const bottleShopTotal = document.getElementById(
    "bottleShopTotal"
);

const bottleSavingTotal = document.getElementById(
    "bottleSavingTotal"
);

const nextEnjoymentAmount = document.getElementById(
    "nextEnjoymentAmount"
);

const quickButtons = document.querySelectorAll(
    ".quick-buttons button[data-target][data-value]"
);


/* =========================
   FORMAT
========================= */

function formatNumber(value) {
    return Math.round(value).toLocaleString("ja-JP");
}


/* =========================
   QUICK BUTTONS
========================= */

function syncQuickButtons(inputElement) {

    const targetId = inputElement.id;

    const buttons = document.querySelectorAll(
        `.quick-buttons button[data-target="${targetId}"]`
    );

    buttons.forEach((button) => {

        const buttonValue = Number(button.dataset.value);
        const inputValue = Number(inputElement.value);

        button.classList.toggle(
            "active",
            inputElement.value !== "" &&
            buttonValue === inputValue
        );

    });

}


quickButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const targetId = button.dataset.target;
        const value = button.dataset.value;

        const targetInput = document.getElementById(
            targetId
        );

        if (!targetInput) {
            return;
        }

        targetInput.value = value;

        syncQuickButtons(
            targetInput
        );

    });

});


bottleVolumeInput.addEventListener(
    "input",
    () => {

        syncQuickButtons(
            bottleVolumeInput
        );

    }
);


pourVolumeInput.addEventListener(
    "input",
    () => {

        syncQuickButtons(
            pourVolumeInput
        );

    }
);


/* =========================
   1杯アイコン
   ROCKS GLASS
========================= */

function createSingleGlassIcon() {

    return `
        <div class="mini-glass">

            <svg
                viewBox="0 0 26 26"
                aria-hidden="true"
                fill="none"
            >

                <!-- ROCKS GLASS -->

                <path
                    d="
                        M5 4
                        L21 4
                        L19 21
                        Q18.5 23 13 23
                        Q7.5 23 7 21
                        Z
                    "
                    fill="none"
                ></path>

                <!-- WHISKY -->

                <path
                    class="mini-liquid"
                    d="
                        M7.7 15
                        Q13 16.5 18.3 15
                    "
                    fill="none"
                ></path>

                <!-- BOTTOM -->

                <path
                    d="
                        M7.5 20
                        Q13 21.5 18.5 20
                    "
                    fill="none"
                ></path>

            </svg>

            <span class="single-glass-badge">
                1
            </span>

        </div>
    `;

}


/* =========================
   10杯アイコン
   OVERLAPPED ROCKS GLASSES
========================= */

function createTenGlassIcon() {

    return `
        <div class="group-icon-item">

            <div class="group-badge-glass">

                <svg
                    viewBox="0 0 40 30"
                    aria-hidden="true"
                    fill="none"
                >

                    <!-- BACK ROCKS GLASS -->

                    <g transform="translate(14,1)">

                        <path
                            d="
                                M4 3
                                L17 3
                                L15.5 19
                                Q15 21 10.5 21
                                Q6 21 5.5 19
                                Z
                            "
                            fill="none"
                        ></path>

                        <path
                            class="mini-liquid"
                            d="
                                M6.2 14
                                Q10.5 15.3 14.8 14
                            "
                            fill="none"
                        ></path>

                        <path
                            d="
                                M6 18
                                Q10.5 19.3 15 18
                            "
                            fill="none"
                        ></path>

                    </g>


                    <!-- FRONT ROCKS GLASS -->

                    <g transform="translate(1,5)">

                        <path
                            d="
                                M4 3
                                L17 3
                                L15.5 19
                                Q15 21 10.5 21
                                Q6 21 5.5 19
                                Z
                            "
                            fill="none"
                        ></path>

                        <path
                            class="mini-liquid"
                            d="
                                M6.2 14
                                Q10.5 15.3 14.8 14
                            "
                            fill="none"
                        ></path>

                        <path
                            d="
                                M6 18
                                Q10.5 19.3 15 18
                            "
                            fill="none"
                        ></path>

                    </g>

                </svg>


                <span class="group-badge">
                    10
                </span>

            </div>

        </div>
    `;

}


/* =========================
   GLASSES GRID
========================= */

function renderGlassesGrid(glassesPerBottle) {

    glassesGrid.innerHTML = "";

    if (glassesPerBottle <= 0) {
        return;
    }


    const tenCount =
        Math.floor(
            glassesPerBottle / 10
        );


    const oneCount =
        glassesPerBottle % 10;


    glassesGrid.classList.toggle(
        "compact-mode",
        glassesPerBottle >= 40
    );


    /* 10杯単位 */

    for (
        let i = 0;
        i < tenCount;
        i++
    ) {

        glassesGrid.insertAdjacentHTML(
            "beforeend",
            createTenGlassIcon()
        );

    }


    /* 端数 */

    for (
        let i = 0;
        i < oneCount;
        i++
    ) {

        glassesGrid.insertAdjacentHTML(
            "beforeend",
            createSingleGlassIcon()
        );

    }

}


/* =========================
   CALCULATE
========================= */

function calculate() {

    const bottlePrice =
        Number(
            bottlePriceInput.value
        );


    const bottleVolume =
        Number(
            bottleVolumeInput.value
        );


    const pourVolume =
        Number(
            pourVolumeInput.value
        );


    const shopPrice =
        Number(
            shopPriceInput.value
        );


    if (
        !bottlePrice ||
        !bottleVolume ||
        !pourVolume ||
        !shopPrice ||
        bottlePrice <= 0 ||
        bottleVolume <= 0 ||
        pourVolume <= 0 ||
        shopPrice <= 0
    ) {
        return;
    }


    /* =========================
       COST PER POUR
    ========================= */

    const exactHomePricePerGlass =
        (
            bottlePrice /
            bottleVolume
        ) *
        pourVolume;


    const roundedHomePricePerGlass =
        Math.round(
            exactHomePricePerGlass
        );


    const savingPerGlass =
        shopPrice -
        exactHomePricePerGlass;


    const roundedSavingPerGlass =
        Math.round(
            savingPerGlass
        );


    pourVolumeResult.textContent =
        formatNumber(
            pourVolume
        );


    homePriceResult.textContent =
        formatNumber(
            roundedHomePricePerGlass
        );


    homeBarValue.textContent =
        formatNumber(
            roundedHomePricePerGlass
        );


    savingPerGlassInline.textContent =
        formatNumber(
            roundedSavingPerGlass
        );


    shopBarValue.textContent =
        formatNumber(
            shopPrice
        );


    /* =========================
       GRAPH
    ========================= */

    const homeRatio =
        (
            exactHomePricePerGlass /
            shopPrice
        ) *
        100;


    const clampedHomeRatio =
        Math.max(
            0,
            Math.min(
                100,
                homeRatio
            )
        );


    const savingRatio =
        Math.max(
            0,
            100 -
            clampedHomeRatio
        );


    homeBarFill.style.width =
        `${clampedHomeRatio}%`;


    savingBarBox.style.width =
        `${savingRatio}%`;


    shopBarFill.style.width =
        "100%";


    /* =========================
       BY THE BOTTLE
    ========================= */

    const glassesPerBottle =
        Math.floor(
            bottleVolume /
            pourVolume
        );


    const homeTotal =
        bottlePrice;


    const shopTotal =
        glassesPerBottle *
        shopPrice;


    const savingTotal =
        shopTotal -
        homeTotal;


    bottleVolumeFormula.textContent =
        formatNumber(
            bottleVolume
        );


    pourVolumeFormula.textContent =
        formatNumber(
            pourVolume
        );


    glassesPerBottleResult.textContent =
        formatNumber(
            glassesPerBottle
        );


    bottleCompareCount.textContent =
        formatNumber(
            glassesPerBottle
        );


    bottleHomeTotal.textContent =
        formatNumber(
            homeTotal
        );


    bottleShopTotal.textContent =
        formatNumber(
            shopTotal
        );


    bottleSavingTotal.textContent =
        formatNumber(
            savingTotal
        );


    /* =========================
       NEXT ENJOYMENT
    ========================= */

    if (nextEnjoymentAmount) {

        nextEnjoymentAmount.textContent =
            formatNumber(
                savingTotal
            );

    }


    /* =========================
       GLASS VISUAL
    ========================= */

    renderGlassesGrid(
        glassesPerBottle
    );


    /* =========================
       RESULT
    ========================= */

    resultSection.classList.add(
        "show"
    );


    requestAnimationFrame(
        () => {

            resultSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

}


/* =========================
   CLEAR
========================= */

function clearInputs() {

    bottlePriceInput.value = "";

    bottleVolumeInput.value = "";

    pourVolumeInput.value = "";

    shopPriceInput.value = "";


    quickButtons.forEach(
        (button) => {

            button.classList.remove(
                "active"
            );

        }
    );


    pourVolumeResult.textContent =
        "0";


    homePriceResult.textContent =
        "0";


    homeBarValue.textContent =
        "0";


    savingPerGlassInline.textContent =
        "0";


    shopBarValue.textContent =
        "0";


    homeBarFill.style.width =
        "0%";


    savingBarBox.style.width =
        "0%";


    shopBarFill.style.width =
        "0%";


    bottleVolumeFormula.textContent =
        "0";


    pourVolumeFormula.textContent =
        "0";


    glassesPerBottleResult.textContent =
        "0";


    bottleCompareCount.textContent =
        "0";


    bottleHomeTotal.textContent =
        "0";


    bottleShopTotal.textContent =
        "0";


    bottleSavingTotal.textContent =
        "0";


    if (nextEnjoymentAmount) {

        nextEnjoymentAmount.textContent =
            "0";

    }


    glassesGrid.innerHTML =
        "";


    glassesGrid.classList.remove(
        "compact-mode"
    );


    resultSection.classList.remove(
        "show"
    );


    bottlePriceInput.focus();

}


/* =========================
   EVENTS
========================= */

calculateButton.addEventListener(
    "click",
    calculate
);


clearButton.addEventListener(
    "click",
    clearInputs
);


/* =========================
   ENTER KEY
========================= */

[
    bottlePriceInput,
    bottleVolumeInput,
    pourVolumeInput,
    shopPriceInput
].forEach(
    (input) => {

        input.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key ===
                    "Enter"
                ) {

                    calculate();

                }

            }
        );

    }
);