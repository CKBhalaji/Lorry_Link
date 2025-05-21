package project.lorry_link.lorry_backend.controller;

import project.lorry_link.lorry_backend.entity.GoodsOwner;
import project.lorry_link.lorry_backend.service.GoodsOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class GoodsOwnerController {

    @Autowired
    private GoodsOwnerService goodsOwnerService;

    @PostMapping("/signup-goods-owner")
    public GoodsOwner registerGoodsOwner(@RequestBody GoodsOwner goodsOwner) {
        return goodsOwnerService.registerGoodsOwner(goodsOwner);
    }

    @PostMapping("/login-goods-owner")
    public GoodsOwner loginGoodsOwner(@RequestParam String username, @RequestParam String password) {
        return goodsOwnerService.loginGoodsOwner(username, password);
    }
}
