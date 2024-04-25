function validerFilm(film) {
    let ingenFeil;
    if (film === " ") {
        $("#filmFeil").html("Velg en film!");
        ingenFeil = false;
    } else {
        $("#filmFeil").html("");
        ingenFeil = true;
    }
    return ingenFeil;
}

function validerAntall(antall) {
    let ingenFeil;
    if (isNaN(antall)) {
        $("#antallFeil").html("Skriv inn et gyldig tall!");
        ingenFeil = false;
    } else if (antall < 1) {
        $("#antallFeil").html("Du må kjøpe minst 1 billett.");
        ingenFeil = false;
    } else if (antall > 30) {
        $("#antallFeil").html("Du kan ikke kjøpe flere enn 30 billetter.");
        ingenFeil = false;
    } else {
        $("#antallFeil").html("");
        ingenFeil = true;
    }
    return ingenFeil;
}

function validerFornavn(fornavn) {
    let ingenFeil;
    const regexp = /^[a-zA-ZæøåÆØÅ. \-]{2,20}$/
    const ok = regexp.test(fornavn);
    if (!ok) {
        $("#fornavnFeil").html("Fornavnet må bestå av 2 til 20 bokstaver.");
        ingenFeil = false;
    } else {
        $("#fornavnFeil").html("");
        ingenFeil = true;
    }
    return ingenFeil;
}

function validerEtternavn(etternavn) {
    let ingenFeil;
    const regexp = /^[a-zA-ZæøåÆØÅ. \-]{2,30}$/;
    const ok = regexp.test(etternavn);
    if (!ok) {
        $("#etternavnFeil").html("Etternavnet må bestå av 2 til 30 bokstaver.");
        ingenFeil = false;
    } else {
        $("#etternavnFeil").html("");
        ingenFeil = true;
    }
    return ingenFeil;
}

function validerTelefonnr(telefonnr) {
    let ingenFeil;
    const regexp = /^[94]\d{7}$/;
    const ok = regexp.test(telefonnr);
    if (!ok) {
        $("#telefonnrFeil").html("Telefonnummeret er ugyldig!\nMå starte på 4 eller 9 og inneholde 8 siffer.");
        ingenFeil = false;
    } else {
        $("#telefonnrFeil").html("");
        ingenFeil = true;
    }
    return ingenFeil;
}

function validerEpost(epost) {
    let ingenFeil;
    const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const ok = regexp.test(epost);
    if (!ok) {
        $("#epostFeil").html("Eposten er ugylidig!");
        ingenFeil = false;
    } else {
        $("#epostFeil").html("");
        ingenFeil = true;
    }
    return ingenFeil;
}

function validerOgKjopBillett() {
    let filmOK = validerFilm($("#filmer").val());
    let antallOK = validerAntall($("#antall").val());
    let fornavnOK = validerFornavn($("#fornavn").val());
    let etternavnOK = validerEtternavn($("#etternavn").val());
    let telefonnrOK = validerTelefonnr($("#telefonnr").val());
    let epostOK = validerEpost($("#epost").val());

    if (filmOK && antallOK && fornavnOK && etternavnOK && telefonnrOK && epostOK) {
        kjopBillett();
    }
}

function kjopBillett() {
    let innFilm = $("#filmer").val();
    let innAntall = $("#antall").val();
    let innFornavn = $("#fornavn").val();
    let innEtternavn = $("#etternavn").val();
    let innTelefonnr = $("#telefonnr").val();
    let innEpost = $("#epost").val();

    const bestilling = {
        film : innFilm,
        antall : innAntall,
        fornavn : innFornavn,
        etternavn : innEtternavn,
        telefonnr : innTelefonnr,
        epost : innEpost
    }

    $.post("/kjopBilletter", bestilling, function(){
        hentBestillinger();
        // Tømmer inputfeltene
        $("#filmer").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    });
}

function hentBestillinger() {
    $.get("/hent", function(data) {
        skrivUt(data);
    });
}

function skrivUt(liste) {
    let ut = "<table class='table table-striped'><tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th>" +
        "<th>Telefonnr</th><th>Epost</th></tr>";
    for (const bestilling of liste) {
        ut += "<tr><td>" + bestilling.film + "</td><td>" + bestilling.antall + "</td><td>" + bestilling.fornavn +
            "</td><td>" + bestilling.etternavn + "</td><td>" + bestilling.telefonnr + "</td><td>" + bestilling.epost +"</td></tr>"
    }
    ut += "</table>";
    $("#alleBestillinger").html(ut);
}

function slettBilletter(){
    $.post("/slett", function(){
        hentBestillinger();
    });
}