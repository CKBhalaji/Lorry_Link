package project.lorry_link.lorry_backend.service.impl;

import project.lorry_link.lorry_backend.entity.GoodsOwner;
import project.lorry_link.lorry_backend.repository.GoodsOwnerRepository;
import project.lorry_link.lorry_backend.service.GoodsOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoodsOwnerServiceImpl implements GoodsOwnerService {

    @Autowired
    private GoodsOwnerRepository goodsOwnerRepository;

    @Override
    public GoodsOwner registerGoodsOwner(GoodsOwner goodsOwner) {
        return goodsOwnerRepository.save(goodsOwner);
    }

    @Override
    public GoodsOwner loginGoodsOwner(String username, String password) {
        GoodsOwner goodsOwner = goodsOwnerRepository.findByUsername(username);
        if (goodsOwner != null && goodsOwner.getPassword() != null && goodsOwner.getPassword().equals(password)) {
            return goodsOwner;
        }
        return null;
    }
}
