document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.querySelector('.site-header');
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const body = document.body;

    // Mobile Menu Toggle
    burgerMenu.setAttribute('aria-expanded', 'false'); // Init
    burgerMenu.addEventListener('click', () => {
        // Toggle Active Classes
        const isActive = mobileOverlay.classList.toggle('active');
        body.classList.toggle('mobile-active');

        // Update ARIA
        burgerMenu.setAttribute('aria-expanded', isActive);

        // Prevent scrolling when menu is open
        if (isActive) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });

    // Close Mobile Menu when clicking a link (excluding accordion toggles)
    const mobileLinks = document.querySelectorAll('.mobile-nav-link:not(.accordion-header)');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
            body.classList.remove('mobile-active');
            body.style.overflow = '';
            burgerMenu.setAttribute('aria-expanded', 'false');
        });
    });

    // Sticky Header Logic (Scroll Detection)
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('hidden');
            lastScroll = currentScroll;
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 80) {
            // Scrolling Down -> Hide Header
            header.classList.add('hidden');
        } else {
            // Scrolling Up -> Show Header
            header.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    });

    // Mobile Accordion Logic
    const accordionHeader = document.querySelector('.accordion-header');
    const accordionContent = document.querySelector('.accordion-content');
    const accordionItem = document.querySelector('.mobile-accordion-item');

    if (accordionHeader && accordionContent) {
        accordionHeader.setAttribute('aria-expanded', 'false'); // Init
        accordionHeader.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing menu
            accordionContent.classList.toggle('open');
            const isActive = accordionItem.classList.toggle('active');
            accordionHeader.setAttribute('aria-expanded', isActive);
        });
    }

    /* QUOTE LANGUAGE SWITCH LOGIC */
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const translateBtn = document.getElementById('quote-translate-btn');

    // TEXT CONTENT
    const txtIndigenous = '“Hêwa tô Tkai nã tet kpēzanī. Watktmã Ropibui psê kuwaba, Dat Wa tar Wa tô dure wa Hêmba.”';
    const authIndigenous = '– Sekwa Vicente Xakriabá, 2019';

    const txtPt = '“O céu respira a terra. Temos que ter cuidado, pois uma foto é uma imagem.”';
    const authPt = '– Pajé Vicente Xakriabá, 2019';

    let isPortuguese = false;

    if (translateBtn && quoteText && quoteAuthor) {
        translateBtn.addEventListener('click', () => {
            // Fade Out
            quoteText.classList.add('opacity-0');
            quoteAuthor.classList.add('opacity-0');

            setTimeout(() => {
                if (!isPortuguese) {
                    // Switch to PT
                    quoteText.textContent = txtPt;
                    quoteAuthor.textContent = authPt;
                    isPortuguese = true;
                } else {
                    // Switch back to Indigenous
                    quoteText.textContent = txtIndigenous;
                    quoteAuthor.textContent = authIndigenous;
                    isPortuguese = false;
                }

                // Fade In
                quoteText.classList.remove('opacity-0');
                quoteAuthor.classList.remove('opacity-0');
            }, 500); // 500ms match css transition
        });
    }

    /* APRESENTACAO PAGE LOGIC */
    const apresentacaoBtn = document.getElementById('apresentacao-translate-btn');
    const apresentacaoText = document.getElementById('apresentacao-text');

    if (apresentacaoBtn && apresentacaoText) {
        // Real Text Content
        const aprIndigenous = `
            <p>Dahêmba târaporê nã dat kburõi mnõ zatô dure aimõ mrmẽ kãtô ro wasku kmãhâ damã, zatô dure romwasku dam wasku prê, twa, târaporê dam wẽki, are kbure dure danĩm mãrkõdi, ahâmre aire tô damrmẽ nãsi tetô romwasku mnõ wahĩkwa kãtô wahĩkrta nõrĩ rom nnãkrta mnõ tkrê waskukwa, dahêmba kburõi zep zatô kahâ snã rom nnãkrta mnõ krêkburõĩ kwa, tô rom krarê nã kãtô srurê hawi za aimõ târaporê dahêmba kburõizep nã nõkwa romkmãdâ sawre snã krêpok sim Akwẽ pibumã, wahĩkwa kãtô wahĩkrta mnõ romkmãdkâ nnãkrda ahâmre hawi krêwasku mnõ watô aimõ kmãwahui nĩ wanĩm waptem nõraimã kãtô brure Akwẽ mã, tô wasissum snã si waza aimõ kbure romkmãdkâ prê snã kãtô wẽ snã kmãdkâ nĩ, Xakriabá sĩm romkmãdâ tmã sawidi kãtô tmãkmãdkâ prêdi dure.</p>
            <p>Târaporê tô dahêmba nmẽze zatô aimõ romkmãdâ waskuzem pibumã dure tpêsê, twa, tô aimõ nõkwam nõrĩ hãs nẽ kãtô hrânẽ zatô târaporê romkmãdkâ kmã hâ kãtô wasku, târaporê zatô dure damrmẽ têkburõi pibumã tpêsê, twa, têtô aimõ târaporê nĩpttêtê prê zawresnã, wanĩm romkmãdkâ mnõ zatô dure aimõ tprê snã nõmr târaporê dahêmba kburõizep hawi, twa, dahêmba kburõizê romkmãdkâ pê kãtô romkmãdâ wẽ mãt aimõ krãĩ watobr wamã, wa watô Xakriabá tô ĩsiwadi nõraimẽ waza aimõ krĩs sikwanĩ wanĩm Akwẽ nõrai pibumã, hêsuka zanãmrĩ zatô aimõ sromã nĩm romkmãdâ wanĩm waptem nõrĩ têwahiku mnõ pari zatô wanĩm Akwẽ nõraimã zemã tpêsê hêsuka têkrãĩ krta pibumã kuikre snã, tô ahâm zawre wahĩkwa nõrai nẽ waza aimõ wasissum snã waza romkmãdkâ btâ pê kãtô romkmãdâ psêzõ aimõ krwarĩt, wa ĩnisizê tô Edgar Kanaykõ Xakriabá.</p>
        `;
        const aprPt = `
            <p>Caminhei todas as dimensões, alcanço o passado, o presente e o futuro de outras gerações. Meu verdadeiro significado é definido por diferentes olhares, desde aquele de um velho indígena, de uma criança ou de um homem “sofisticado”, do pobre trabalhador, até a história para além do historiador. Transcreve a alma, a espiritualidade. Transmite o irreal que vira realidade. Por trás de cada imagem, que retrata uma história translaçada de verdades nos relances da memória e em meio a tantas belezas, revelam-se e, ao mesmo tempo, ocultam-se segredos da “cultura natureza”, dos pássaros, dos encantados.</p>
            <p>A fotografia fala e, se preciso, também grita. A fotografia se cala, conduz e anuncia, revela e relata e, se necessário, denuncia. Por muito tempo vivemos o ponto forte da oralidade; hoje ela se fortalece com a escrita e se embeleza com a imagem. Ela atravessa os olhos dos povos indígenas, a imagem que revela cada especificidade, no mais simples da simplicidade. A fotografia revela o ser, fortalece o saber e, principalmente, ensina a aprender. Eu sou indígena que veio ao mundo para lutar. Vivo de um olhar inspirado por meus antepassados e daqueles que um dia irão chegar. Eu sou o sonho que almeja dias melhores, wahã (eu sou) Edgar Kanaykõ Xakriabá. Vim do norte, do cerrado, das aldeias Xakriabá.</p>
        `;

        let isAprPt = true; // Default is now PT

        apresentacaoBtn.addEventListener('click', () => {
            // Fade Out Children
            const paragraphs = apresentacaoText.querySelectorAll('p');
            paragraphs.forEach(p => p.classList.add('opacity-0'));

            setTimeout(() => {
                if (isAprPt) {
                    apresentacaoText.innerHTML = aprIndigenous;
                    isAprPt = false;
                } else {
                    apresentacaoText.innerHTML = aprPt;
                    isAprPt = true;
                }
            }, 500);
        });
    }

    /* CURADORIA PAGE LOGIC */
    const curadoriaBtn = document.getElementById('curadoria-translate-btn');
    const curadoriaText = document.getElementById('curadoria-text');

    if (curadoriaBtn && curadoriaText) {
        const curIndigenous = `
            <p>Ponkwanē hã kmã damrmē (alma e espírito) tô smisi damrmē nã za nõkwa kmã kawakõ.<sup>1</sup> Hêmba Akwē mrmēzem wa tô tanē waza sahure kmã wamtrēn.</p>
            <p>Tô tanē za dure Xakriabá nã hã nõrī dat wamtrē dure sisi amõ da hêmba tê wasku wamtrē pibumã. Edgar Kanaykõ Xakriabá, da hêmba nnãrkwa kãtô akwē nīm rommãdkâ nã hã hêsuka zanãrmkwa, za totahawi snãkrat, tô da hêmba nnãri tô tahã mã zatô aimõ smistu sipra tinē, tô tazi zahã tê ka wasku wi ropore kburemã tô tahã da hêmba tê kannãrī tê wasku pibumã. Tô tahã akwē nõrai sim romkmãdkâ wa zatô kmã simpko pês: pto, snãkrda, hêwa, hêwardu, wirê, wasitopre, kuzâ, kâ, sipsêze, kbazeīpra, romzari. Rowasku kmã simakrsê sikutõr kumnãstê, hêmba tkrê sakra mnõ, amõ tkrê wasku wamhuire pibumã sim akwē nīm romkmãdâ, hêwa kãtô tka, tô dure hêmba danī mē.</p>
            <p>Tô tahã hêsuka hêmba (fotoeditorial,2023) tô 10 nã wahu tê wasku re, da hêmba re hã. Tôtahã tô "Akwē simē kurpsê nã krsiprê " are isakru tô São João das Missões, Minas Gerais wa. Tazi dat kmã Solar Fabio Prado tô tahã rom wasku, Edgar Kanaykõ Xakriabá tô mrēpranē rommãdâ ssõre psêsnã, ro tê sãmr pra. Tka zawre, Romhêmba wasku zamãr waihku kõ, Waniptdê.</p> 
            <p>Tka zawre tô īwakrdu kãtô īrã mē za nnãkrat, are tê saihrâ da sim rom mãdâ kãtô sim rom waihku pibumã, tô sim Akwē nõrai tê. Tô tahã Xakriabá nõrī tetô aimõ tsikwanī aipâ sim tka tê smrī pibumã kâwawē zabba tê kmã São Fransisco bbarãnã tô amõ ttênã tkrê kmãto ahâmrehawi ttê nã. Tô tahã tka knwa nmrõmnõze tô 1987 wahum nã mãt tmã kapkon, are tô 60 km nã tô tahã kâwawē rawi īrompa.</p>
            <p>Romhêmba wasku zamãr waihku kõ, tô tahã da hêmba nnãrkwa- hêsuka zanãmr kwa za tprê aimõwi hêmba wēsnã, are dure sako kbuzi zawresnã rom mmãdâ tê kwarti wa, rom tdêkwa aikuwa mbahã, rom hêmba, are tanēsnã za tô amõ da krãikahâ tô ropore snã da hêmbba nnãrī snã, tô dakrãiwa dat kwasar mnõpibumã. Hêmba, rompadi amõ si wasku prsê pibumã ikwaiba krtabi, tanēdi za aimõ tô kmãdâk aimõwim snã nē, tô krsipsêmnõ tê waihkuwa krda krãipus mnõze wdê nī hawi, romzari, tô ahâmre hã hawi. Dato tê sãmr nēhã kãtô — dato tê sãmr kõnēhã — hêwa mba hã kãtô dure tkai mba hã rom sãmr kõ.</p>
            <p>Wanipttêze tô īstõmhã tê kmã kawakõ za tôtazi da hêmba tê sakra zem wa , tô tahã tô da hêmba hêsuka mba tê sakra mnõpibumã, tô siptêze tanõrai mã tanē tê rmē mnõwa hêsuka mba amõ sim rommãdkâ nã dat wapar kba pibuma, tô sim akwē nõrai tê. Tô tazi Brasília wa, dasikrãiktõze tô ropore tdêkwa tmã da mõr pibumã tê kma (ATL) wa, tô tmõ nã tê sãmri hêmba nnãrkwa di nã mãtô kmãhâ "Wasi ssowahã btâ ssõre tô Akwēnorī".</p>
            <p>Hêmba za aimõ aisatõ waihku pibumã sim akwē nīm rommãdâ, tô da hêmba wasku nipttêze. Tô tahã tô dure aimõwi kmã wasimãzus kba pibumã tô ahanã snã īpsêtmē, are sure rom kmãdkâ wasku tô tahã ropore hã rom hêmba nnãrkwai nõrī tonmē dat kmã Brasil wa.</p>
            
            <p class="footnote"><small><sup>1</sup> Akwẽ damrmēze re pirumã pranē zawre damermēze hawi dazakru, Macro-Jê.</small></p>
        `;

        const curPt = `
            <p>Alma e espírito são designados pela palavra hêmba na língua indígena Akwẽ<sup>1</sup>. Essa mesma expressão é usada pelo povo Xakriabá para nomear imagem e fotografia. Edgar Kanaykõ Xakriabá, fotógrafo e antropólogo indígena, parte desse princípio em que espírito, alma, luz e fotografia se amalgamam para nos fazer entrever, nessa sua primeira exposição individual, os mundos de imagens que habitam as vidas indígenas: sementes, troncos, céu, nuvens, lua, estrelas, fogo, água, ritos e animais. Imagens, como emanações de tempos imemoriais, que evidenciam saberes ancestrais ao tecer alianças entre o céu e a terra, entre os astros e os corpos.</p>
            <p>A mostra, desdobramento do fotolivro Hêmba (Fotô Editorial, 2023), condensa dez anos de produção do fotógrafo-antropólogo. Ele pertence ao "povo do segredo" e vive na aldeia em São João das Missões, Norte de Minas Gerais. Aqui no Solar Fabio Prado, a exposição de Edgar Kanaykõ Xakriabá está organizada com base em três eixos que entrelaçam os múltiplos olhares do fotógrafo-antropólogo: Território, Cosmologia e Resistência.</p>
            <p>Território é construído a partir de imagens em preto-e-branco que evocam os saberes e as ciências do seu povo. Os Xakriabá lutam pela reconquista das águas do Rio São Francisco, que fazia parte do seu território ancestral. A primeira terra Xakriabá demarcada em 1987 encontra-se hoje a 60 km da margem do rio.</p>
            <p>Em Cosmologias, o fotógrafo-antropólogo se vale de imagens poéticas e vibrantes que conduzem ao contemplativo para reverenciar manifestações de luzes e seres, os espíritos da floresta e os encantados, e povoam o mundo circular de tempos e memórias. As fotografias, longe de serem descrições ou explicações, permitem entrever outros mundos, com o cuidado de quem aprendeu a lidar com a "ciência" das plantas, dos bichos, dos tempos imemoriais e dos vínculos — visíveis e invisíveis — entre o céu e a terra.</p>
            <p>Resistência é o último eixo da mostra, dedicado à produção fotográfica de caráter documental pensada como um dispositivo de luta e resistência para dar visibilidade às reivindicações indígenas. Nas marchas de resistência em Brasília como o Acampamento Terra Livre (ATL), a maior mobilização indígena do país, o olhar do fotógrafo-antropólogo anuncia: "o futuro é indígena".</p>
            <p>Hêmba é um convite para apreender mundos indígenas por meio da força reveladora da imagem. É também a chance para repensar de forma urgente os sentidos estéticos e políticos da história da fotografia no Brasil.</p>

            <p class="footnote"><small><sup>1</sup> A língua Akwẽ é uma subdivisão do segundo maior tronco linguístico indígena do país, o Macro-Jê.</small></p>
        `;

        let isCurPt = true; // Default is now PT

        curadoriaBtn.addEventListener('click', () => {
            // Fade Out Children
            const paragraphs = curadoriaText.querySelectorAll('p');
            paragraphs.forEach(p => p.classList.add('opacity-0'));

            setTimeout(() => {
                if (isCurPt) {
                    curadoriaText.innerHTML = curIndigenous;
                    isCurPt = false;
                } else {
                    curadoriaText.innerHTML = curPt;
                    isCurPt = true;
                }
            }, 500);
        });
    }

    /* SWIPER INIT */
    const swiperContainer = document.querySelector('.mySwiper');
    if (swiperContainer) {
        var swiper = new Swiper(".mySwiper", {
            spaceBetween: 30,
            effect: "slide", // Changed to slide for gallery feel
            centeredSlides: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            speed: 800,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            loop: true,
        });
    }

    /* GLIGHTBOX INIT */
    const lightbox = GLightbox({
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
    });

});
