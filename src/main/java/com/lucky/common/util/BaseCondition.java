package com.lucky.common.util;

/**
 * Created by lucky on 2017/6/7.
 */
public class BaseCondition {

    private int currentPage = 1;
    private int pageSize = 20;

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
}
