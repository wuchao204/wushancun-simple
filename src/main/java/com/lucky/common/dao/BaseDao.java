package com.lucky.common.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Created by lucky on 2017/6/7.
 */
public class BaseDao {
    @PersistenceContext
    private EntityManager entityManager;

    /**
     * 保存单个对象
     * @param obj
     */
    protected void save(Object obj ){
        entityManager.persist(obj);
    }

}
