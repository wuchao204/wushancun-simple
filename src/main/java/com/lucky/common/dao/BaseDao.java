package com.lucky.common.dao;

import com.lucky.common.util.Page;
import com.lucky.common.util.PageBean;
import org.apache.commons.beanutils.BeanUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.connection.ConnectionProvider;
import org.hibernate.engine.SessionFactoryImplementor;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by lucky on 2017/6/7.
 */
public abstract class BaseDao {
    @PersistenceContext
    private EntityManager entityManager;

    /**
     * 保存单个对象
     * @param obj
     */
    protected void save(Object obj ){
        entityManager.persist(obj);
    }

    /**
     * 保存多个对象
     * @param 	objList		对象列表
     */
    protected void saveAll(List<?> objList)
    {
        for(Object obj : objList)
            save(obj);
    }

    /**
     * 删除单个对象
     * @param 	obj		对象
     */
    protected void delete(Object obj)
    {
        entityManager.remove(obj);
    }

    /**
     * 删除多个对象
     * @param objList		对象列表
     */
    protected void deleteAll(List<?> objList)
    {

        for(Object obj : objList)
            delete(obj);
    }

    /**
     * 根据主键删除单个对象
     * @param 	clazz		单个对象对应字节码
     * @param 	id			主键ID
     */
    protected void deleteObjById(Class<?> clazz, Object id)
    {
        Object obj = querySingleObjById(clazz, id);
        delete(obj);
    }

    /**
     * 更新单个对象
     * @param 	obj		对象
     * @return	Object	更新后的对象
     */
    protected Object update(Object obj)
    {
        return entityManager.merge(obj);
    }

    /**
     * 更新多个对象
     * @param 	objList		对象列表
     */
    protected void updateAll(List<?> objList)
    {
        for(Object obj : objList)
            update(obj);
    }

    /**
     * 根据JPQL语句执行更新操作
     * @param 	jpql		JPQL语句
     * @param 	params		JPQL语句所需参数：无参数传null
     */
    protected void executeUpdate(String jpql, Object... params)
    {
        Query query = entityManager.createQuery(jpql);
        if(params != null && params.length > 0)
        {
            for(int i = 0; i < params.length; i++)
                query.setParameter(i + 1, params[i]);
        }
        query.executeUpdate();
    }

    /**
     * 根据SQL语句执行更新操作
     * @param 	sql			SQL语句
     * @param 	params		SQL语句所需参数：无参数传null
     */
    protected void executeUpdateOfSql(String sql, Object... params)
    {
        Query query = entityManager.createNativeQuery(sql);
        if(params != null && params.length > 0)
        {
            for(int i = 0; i < params.length; i++)
                query.setParameter(i + 1, params[i]);
        }
        query.executeUpdate();
    }

    /**
     * 根据ID获取单个对象
     * @param 	clazz		单个对象对应字节码
     * @param	id			主键ID
     * @return	Object		对象
     */
    protected Object querySingleObjById(Class<?> clazz, Object id)
    {
        return entityManager.getReference(clazz, id);
    }

    /**
     * 根据JPQL语句查询单个对象
     * @param 	jpql		JPQL语句
     * @param 	params		JPQL语句所需参数：无参数传null
     * @return	Object		对象
     */
    protected Object querySingleObj(String jpql, Object... params)
    {
        Query query = null;
        try
        {
            query = entityManager.createQuery(jpql);
            if(params != null && params.length > 0)
            {
                for(int i = 0; i < params.length; i++)
                    query.setParameter(i + 1, params[i]);
            }
            return query.getSingleResult();
        }
        catch(NoResultException e)
        {
            System.out.println("未查询到数据！");
            return null;
        }
    }

    /**
     * 根据JPQL语句查询单个对象
     * @param 	jpql		JPQL语句
     * @param 	params		JPQL语句所需参数：无参数传null
     * @return	Object		对象
     */
    protected Object querySingleObj(String jpql, List<?>  paramList)
    {
        Query query = null;
        try
        {
            query = entityManager.createQuery(jpql);
            if (paramList != null && paramList.size() > 0) {
                for (int i = 0; i < paramList.size(); i++) {
                    Object param = (Object) paramList.get(i);
                    query.setParameter(i + 1, param);
                }
            }
            return query.getSingleResult();
        }
        catch(NoResultException e)
        {
            System.out.println("未查询到数据！");
            return null;
        }
    }

    /**
     * 根据SQL语句查询单个对象
     * @param 	sql		SQL语句
     * @param 	clazz	要映射的实体Class字节码：不映射为null
     * @param 	params	SQL语句所需参数：无参数传null
     * @return	Object	对象
     */
    protected Object querySingleObjOfSql(String sql, Class<?> clazz, Object... params)
    {
        Query query = null;
        try
        {
            if(clazz == null)
                query = entityManager.createNativeQuery(sql);
            else
                query = entityManager.createNativeQuery(sql, clazz);
            if(params != null && params.length > 0)
            {
                for(int i = 0; i < params.length; i++)
                    query.setParameter(i + 1, params[i]);
            }
            return query.getSingleResult();
        }
        catch(NoResultException e)
        {
            System.out.println("未查询到数据！");
            return null;
        }
    }

    /**
     * 根据JPQL语句查询列表
     * @param 	jpql		JPQL语句
     * @param 	params		JPQL语句所需参数：无参数传null
     * @return	List<?>		列表
     */
    protected List<?> queryList(String jpql, Object... params)
    {
        Query query = entityManager.createQuery(jpql);
        if(params != null && params.length > 0)
        {
            for(int i = 0; i < params.length; i++)
                query.setParameter(i + 1, params[i]);
        }
        return query.getResultList();
    }

    /**
     * 根据JPQL语句查询列表
     * @param 	jpql		JPQL语句
     * @param 	params		JPQL语句所需参数：无参数传null
     * @return	List<?>		列表
     */
    protected List<?> queryList(String jpql, List<?>  paramList)
    {
        Query query = entityManager.createQuery(jpql);
        if (paramList != null && paramList.size() > 0) {
            for (int i = 0; i < paramList.size(); i++) {
                Object param = (Object) paramList.get(i);
                query.setParameter(i + 1, param);
            }
        }
        return query.getResultList();
    }

    /**
     * 根据多个ID查询列表
     * @param 	pojoName	POJO名称
     * @param	propName	POJO主键属性名称
     * @param 	idsList		POJO主键ID列表
     * @return  List<?>		列表
     */
    protected List<?> queryListByIds(String pojoName, String propName, List<Long> idsList)
    {
        StringBuffer sb = new StringBuffer();

        for(int i = 0; i < idsList.size(); i++)
            sb.append("?").append(i + 1).append(",");
        sb.deleteCharAt(sb.length() - 1);
        String jpql = "from "+pojoName+" t where t."+propName+" in ("+sb+")";

        Query query = entityManager.createQuery(jpql);
        for(int i = 0; i < idsList.size(); i++)
            query.setParameter(i + 1, idsList.get(i));

        return query.getResultList();
    }

    /**
     * 根据多个ID查询列表
     * @param 	pojoName	POJO名称
     * @param	propName	POJO主键属性名称
     * @param 	idsList		POJO主键ID列表
     * @return  List<?>		列表
     */
    protected List<?> queryListByIds(String pojoName, String propName, String[] idsList)
    {
        StringBuffer sb = new StringBuffer();

        for(int i = 0; i < idsList.length; i++)
            sb.append("?").append(i + 1).append(",");
        sb.deleteCharAt(sb.length() - 1);
        String jpql = "from "+pojoName+" t where t."+propName+" in ("+sb+")";
        Query query = entityManager.createQuery(jpql);
        for(int i = 0; i < idsList.length; i++)
            query.setParameter(i + 1, idsList[i]);

        return query.getResultList();
    }

    /**
     * 根据SQL语句查询列表
     * @param 	sql			SQL语句
     * @param	clazz		要映射的实体Class字节码：不映射为null
     * @param 	params		SQL语句所需参数：无参数传null
     * @return	List<?>		列表
     */
    protected List<?> queryListOfSql(String sql, Class<?> clazz, Object... params)
    {
        Query query = null;
        if(clazz == null)
            query = entityManager.createNativeQuery(sql);
        else
            query = entityManager.createNativeQuery(sql, clazz);
        if(params != null && params.length > 0)
        {
            for(int i = 0; i < params.length; i++)
                query.setParameter(i + 1, params[i]);
        }
        return query.getResultList();
    }

    /**
     * 查询分页(JPQL)
     * @param 	jpqlOfList		查询列表JPQL语句
     * @param 	jpqlOfCount		查询总数JPQL语句
     * @param	currentPage		当前页
     * @return	PageBean		分页Bean
     */
    protected PageBean queryForPage(String jpqlOfList, String jpqlOfCount, int currentPage)
    {
        int allRow = Integer.parseInt(querySingleObj(jpqlOfCount).toString());//总记录数
        int totalPage = PageBean.countTotalPage(10, allRow);//总页数
        currentPage = PageBean.countCurrentPage(currentPage);

        Query query = entityManager.createQuery(jpqlOfList);
        query.setFirstResult((currentPage - 1) * 10);
        query.setMaxResults(10);
        List<?> list = query.getResultList();
        PageBean pageBean = new PageBean();
        pageBean.setPageSize(10);
        pageBean.setCurrentPage(currentPage);
        pageBean.setAllRow(allRow);
        pageBean.setTotalPage(totalPage);
        pageBean.setList(list);
        return pageBean;
    }

    /**
     * 查询分页(SQL)
     * @param 	sqlOfList		查询列表SQL语句
     * @param 	sqlOfCount		查询总数SQL语句
     * @param 	clazz			要映射的实体Class字节码：不映射为null
     * @param 	currentPage		当前页
     * @return	PageBean		分页对象
     */
    protected PageBean queryForPageOfSql(String sqlOfList, String sqlOfCount, Class<?> clazz, int currentPage)
    {
        int allRow = Integer.parseInt(querySingleObjOfSql(sqlOfCount, null, null).toString());//总记录数
        int totalPage = PageBean.countTotalPage(10, allRow);//总页数
        currentPage = PageBean.countCurrentPage(currentPage);

        Query query = null;
        if(clazz == null)
            query = entityManager.createNativeQuery(sqlOfList);
        else
            query = entityManager.createNativeQuery(sqlOfList, clazz);

        query.setFirstResult((currentPage - 1) * 10);
        query.setMaxResults(10);
        List<?> list = query.getResultList();
        PageBean pageBean = new PageBean();
        pageBean.setPageSize(10);
        pageBean.setCurrentPage(currentPage);
        pageBean.setAllRow(allRow);
        pageBean.setTotalPage(totalPage);
        pageBean.setList(list);
        return pageBean;
    }


    /**
     * 设置查询条件参数
     *
     * @param query
     *            查询对象
     * @param paramList
     *            参数列表，列表中为Object对象
     */
    private void setQueryParameters(Query query, List<?> paramList) {
        if (paramList != null && paramList.size() > 0) {
            for (int i = 0; i < paramList.size(); i++) {
                Object param = (Object) paramList.get(i);
                query.setParameter(i + 1, param);
            }
        }
    }

    /**
     * 根据HQL语句获得记录数量
     *
     * @param hql
     *            hql语句
     * @param paramList
     *            查询参数列表，列表中为Object对象
     * @return 记录数量
     */
    protected int countByHQL(String hql, List<?> paramList) {
        Query query = entityManager.createQuery(hql);
        this.setQueryParameters(query, paramList);
        return ((Number) query.getSingleResult()).intValue();
        // return ((Number) query.uniqueResult()).intValue();
    }

    /**
     * 取得分页列表。
     *
     * @param qryHql
     *            分页列表查询hql语句。
     * @param args
     *            查询参数列表，列表中为Object对象
     * @param pageNo
     *            页数
     * @param pageSize
     *            每页记录数
     * @param countHql
     *            分页记录数查询hql语句
     * @return 分页信息
     */
    protected Page findByHQLWithPage(String qryHql, List<?> args, int pageNo, int pageSize, String countHql) {
        if (qryHql == null)
            throw new IllegalArgumentException("NULL is not a valid string");
        if (countHql == null) {
            countHql = (new StringBuilder()).append("select count(*) ").append(qryHql.substring(qryHql.indexOf("from "))).toString();
        }

        // 取得符合条件的记录总数
        int totalCount = countByHQL(countHql, args);
        System.out.println("totalCount=" + totalCount);
        if (totalCount < 1)
            return Page.EMPTY_PAGE;

        Query query = entityManager.createQuery(qryHql);
        setQueryParameters(query, args);
        if (pageNo < 1)
            pageNo = 1;
        int startIndex = Page.getStartOfAnyPage(pageNo, pageSize);
        List<?> list = query.setFirstResult(startIndex - 1).setMaxResults(pageSize).getResultList();
        int avaCount = list != null ? list.size() : 0;

        return new Page(startIndex, avaCount, totalCount, pageSize, list);
    }

    protected Page findByHQLWithPage(String qryHql, List<?> args, int pageNo, int pageSize) {
        return findByHQLWithPage(qryHql, args, pageNo, pageSize, null);
    }

    /**
     * 调用存储过程返回单个结果集
     * @param 	procedureName		存储过程名称
     * @param 	params				存储过程所需输入参数：无输入参数传null
     * @return	ResultSet			结果集
     */
    protected ResultSet callProcedureOfSingleResultSet(String procedureName, Object... params)
    {
        Connection conn = getConnectionOfJdbc();
        CallableStatement stmt = null;
        ResultSet resultSet = null;

        try
        {
            //设置存储过程语句
            StringBuffer sql = new StringBuffer();
            sql.append("{ call "+procedureName+"(");

            if(params != null && params.length > 0)
            {
                for(int i = 0; i < params.length; i++)
                    sql.append("?,");
            }
            sql.append("?)}");

            stmt = conn.prepareCall(sql.toString());

            //设置存储过程输入参数
            if(params != null && params.length > 0)
            {
                for(int i = 0; i < params.length; i++)
                    stmt.setObject(i + 1, params[i]);
            }

            //注册存储过程输出参数
        /*    if(params != null && params.length > 0)
                stmt.registerOutParameter(params.length + 1, OracleTypes.CURSOR);
            else
                stmt.registerOutParameter(1, OracleTypes.CURSOR);*/

            stmt.execute();
            if(params != null && params.length > 0)
                resultSet = (ResultSet) stmt.getObject(params.length + 1);
            else
                resultSet = (ResultSet) stmt.getObject(1);
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        finally
        {
            try
            {
                if(stmt != null)
                    stmt.close();
                if(conn != null)
                    conn.close();
            }
            catch(Exception e)
            {
                e.printStackTrace();
            }
        }

        return resultSet;
    }

    /**
     * 反射到实体
     * @param 	resultSet		结果集
     * @param 	destClass		反射的目标类
     * @return	Object			返回的目标类数组
     */
    public static Object[] invokeEntity(ResultSet resultSet, Class<?> destClass)
    {
        List<Object> objList = new ArrayList<Object>();
        Object[] objAry = null;
        try
        {
            BeanUtils beanUtils = new BeanUtils();
            BeanInfo beanInfo = Introspector.getBeanInfo(destClass);
            PropertyDescriptor[] pds = beanInfo.getPropertyDescriptors();
            ResultSetMetaData metaData = resultSet.getMetaData();
            while(resultSet.next())
            {
                Object object = destClass.newInstance();
                for(int i = 0; i < metaData.getColumnCount(); i++)
                {
                    String columnName = metaData.getColumnLabel(i+1);
                    for(PropertyDescriptor pd : pds)
                    {
                        if(pd.getName().equalsIgnoreCase(columnName))
                        {
                            Object objValue = resultSet.getObject(columnName);
                            if(objValue != null)
                                beanUtils.setProperty(object, pd.getName(), objValue);
                            break;
                        }
                    }
                }
                objList.add(object);
            }
            objAry = new Object[objList.size()];
            for(int i = 0; i < objList.size(); i++)
            {
                objAry[i] = objList.get(i);
            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        return objAry;
    }


    /**
     * 获取JDBC连接
     * @return	Connection		JDBC连接
     */
    private Connection getConnectionOfJdbc()
    {
        Session session = (Session) entityManager.getDelegate();
        SessionFactory sessionFactory = session.getSessionFactory();
        ConnectionProvider connectionProvider = ((SessionFactoryImplementor)sessionFactory).getConnectionProvider();
        Connection conn = null;

        try
        {
            conn = connectionProvider.getConnection();
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }

        return conn;

    }

    public  Object reflect(Class<?> clazz,Object...objects) throws Exception{

        //获取指定类的构造方法
        Object target = clazz.newInstance();
        Field[] fields = clazz.getDeclaredFields();
        for (int i = 0; i < fields.length; i++) {
            //获取set方法并执行
            Method meth = clazz.getMethod("set"+change(fields[i].getName()), String.class);
            meth.invoke(target,new Object[]{objects[i]});
        }
        return target;
    }

    /**
     * 字符串，将src的第一个字母转换为大写，src为空时返回null
     * @param src
     * @return
     */
    public  String change(String src) {
        if (src != null) {
            StringBuffer sb = new StringBuffer(src);
            sb.setCharAt(0, Character.toUpperCase(sb.charAt(0)));
            return sb.toString();
        } else {
            return null;
        }
    }
}
