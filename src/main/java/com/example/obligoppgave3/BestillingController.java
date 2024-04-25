package com.example.obligoppgave3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BestillingController {

    @Autowired
    private BestillingRepository rep;

    @PostMapping("/kjopBilletter")
    public void registrerBestilling(Bestilling bestilling) {
        rep.lagreBestilling(bestilling);
    }

    @GetMapping("/hent")
    public List<Bestilling> hentBestillinger() {
        return rep.hentBestillinger();
    }

    @PostMapping("/slett")
    public void slettAlleBestillinger() {
        rep.slettAlleBestillinger();
    }
}