package com.lucky.common.util;

import java.util.List;

/**
 * Created by acer on 2017/6/10.
 * 分页Bean
 */
public class PageBean {
    private List<?> list;			//要返回的某一页的记录列表
    private int allRow;				//总记录数
    private int totalPage; 			//总页数
    private int currentPage;		//当前页
    private int pageSize;			//每页记录数

    private boolean hasPrePage;		//是否有前一页
    private boolean hasNextPage;	//是否有下一页

    /**
     * 初始化分页信息
     */
    public void init()
    {
        this.hasPrePage = getHasPrePage();
        this.hasNextPage = getHasNextPage();
    }

    /**
     * 计算总页数
     * @param pageSize
     * @param allRow
     * @return
     */
    public static int countTotalPage(final int pageSize, final int allRow)
    {
        return allRow % pageSize == 0 ? allRow / pageSize : allRow / pageSize + 1;
    }

    /**
     * 计算当前页开始记录
     * @param pageSize
     * @param currentPage
     * @return
     */
    public static int countOffset(final int pageSize, final int currentPage)
    {
        return pageSize * (currentPage - 1);
    }

    /**
     * 计算当前页
     * @param page
     * @return
     */
    public static int countCurrentPage(int page)
    {
        return page == 0 ? 1 : page;
    }

    public List<?> getList() {
        return list;
    }
    public void setList(List<?> list) {
        this.list = list;
    }

    public int getAllRow() {
        return allRow;
    }
    public void setAllRow(int allRow) {
        this.allRow = allRow;
    }

    public int getTotalPage() {
        return totalPage;
    }
    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public int getCurrentPage() {
        return currentPage;
    }
    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getPageSize() {
        return pageSize;
    }
    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public boolean getHasPrePage() {
        return currentPage != 1;
    }

    public boolean getHasNextPage() {
        return currentPage != totalPage;
    }

    public void setHasPrePage(boolean hasPrePage) {
        this.hasPrePage = hasPrePage;
    }

    public void setHasNextPage(boolean hasNextPage) {
        this.hasNextPage = hasNextPage;
    }
}
