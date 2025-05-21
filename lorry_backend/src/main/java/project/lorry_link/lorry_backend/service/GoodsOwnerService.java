package project.lorry_link.lorry_backend.service;

import project.lorry_link.lorry_backend.entity.GoodsOwner;

public interface GoodsOwnerService {
    GoodsOwner registerGoodsOwner(GoodsOwner goodsOwner);
    GoodsOwner loginGoodsOwner(String username, String password);
}
