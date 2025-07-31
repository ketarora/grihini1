package com.example.Gruhani.Repositories;

import com.example.Gruhani.dtos.productdto;
import com.example.Gruhani.models.product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<product,String> {
    List<product> findAllBystatus(String approved);

    product findByid(String id);

     List<product> findAllByname(String s);
}
