package com.carlosribeiro.sb01.controller;

import com.carlosribeiro.sb01.model.Carrinho;
import com.carlosribeiro.sb01.service.CarrinhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import java.util.List;

import com.carlosribeiro.sb01.util.ConstantesServidor;

@CrossOrigin(ConstantesServidor.URL)
@RestController
@RequestMapping("carrinho")

public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;

    @GetMapping
    public List<Carrinho> recuperarCarrinho(){
        return carrinhoService.recuperarCarrinho();
    }
}
