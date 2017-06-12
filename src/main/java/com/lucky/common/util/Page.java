package com.lucky.common.util;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
    /**
     * 页对象，用于包含数据及分页信息的对象，Page类实现了用于显示分页信息的基本方法，结果数据的类型是List
     *
     * @author lucky
     */
@SuppressWarnings("unchecked")
public class Page implements Serializable {

        private static final long serialVersionUID = 1L;

        public static final Page EMPTY_PAGE = new Page();

        public static final int DEFAULT_PAGE_SIZE = 10;

        public static final int MAX_PAGE_SIZE = 100;

        /**
         * 每页的记录数 每页多少行
         */
        private int pageSize = DEFAULT_PAGE_SIZE;

        /**
         * 当前页第一条数据在数据库中的位置
         */
        private int start;

        /**
         * 当前页包含的记录数，currentPageSize <= pageSize
         */
        private int currentPageSize;

        /**
         * 总记录数
         */
        private int totalSize;

        /**
         * 当前页中存放的返回结果列表
         */
        private List<?> result;

        /**
         * 当前页码
         */
        private int currentPage;

        /**
         * 总页数
         */
        private int totalPageCount;

        private Map pageMap;

        /**
         * 构造函数，构造出空页面
         */
        public Page() {
            this(0, 0, 0, DEFAULT_PAGE_SIZE, new ArrayList());
        }

        /**
         * 构造函数
         *
         * @param start
         *            本页数据在数据库中的起始位置
         * @param currentPageSize
         *            本页包含的数据条数
         * @param totalSize
         *            数据库中总记录条数
         * @param pageSize
         *            本页容量
         * @param data
         *            本页包含的数据
         */
        public Page(int start, int currentPageSize, int totalSize, int pageSize, List<?> data) {

            this.currentPageSize = currentPageSize;
            this.pageSize = pageSize;
            this.start = start;
            this.totalSize = totalSize;
            this.result = data;

            this.currentPage = (start - 1) / pageSize + 1;
            this.totalPageCount = (totalSize + pageSize - 1) / pageSize;

            if (totalSize == 0 && currentPageSize == 0) {
                this.currentPage = 1;
                this.totalPageCount = 1;
            }
        }

        /**
         * 当前页中的记录
         */
        public List getResult() {
            return this.result;
        }

        /**
         * 取每页数据容量
         */
        public int getPageSize() {
            return this.pageSize;
        }

        /**
         * 是否有下一页
         */
        public boolean hasNextPage() {
            return (this.getCurrentPage() < this.getTotalPageCount());
        }

        /**
         * 是否有前一页
         */
        public boolean hasPreviousPage() {
            return (this.getCurrentPage() > 1);
        }

        /**
         * 获得当前页第一条数据在数据库中的位置
         */
        public int getStart() {
            return start;
        }

        /**
         * 获得当前页最后一条数据在数据库中的位置
         */
        public int getEnd() {
            int end = this.getStart() + this.getCurrentPageSize() - 1;
            if (end < 0) {
                end = 0;
            }
            return end;
        }

        /**
         * 获取上一页第一条数据在数据库中的位置
         */
        public int getStartOfPreviousPage() {
            return Math.max(start - pageSize, 1);
        }

        /**
         * 获取下一页第一条数据在数据库中的位置
         */
        public int getStartOfNextPage() {
            return start + currentPageSize;
        }

        /**
         * 获取任一页第一条数据在数据库中的位置，每页条数使用默认值
         */
        public static int getStartOfAnyPage(int pageNo) {
            return getStartOfAnyPage(pageNo, DEFAULT_PAGE_SIZE);
        }

        /**
         * 获取任一页第一条数据在数据库中的位置
         */
        public static int getStartOfAnyPage(int pageNo, int pageSize) {
            int startIndex = (pageNo - 1) * pageSize + 1;
            if (startIndex < 1) {
                startIndex = 1;
            }
            return startIndex;
        }

        /**
         * 获得当前页包含的记录数
         */
        public int getCurrentPageSize() {
            return currentPageSize;
        }

        /**
         * 取这次查询符合条件的总记录数
         */
        public int getTotalSize() {
            return this.totalSize;
        }

        /**
         * 获得当前页码
         */
        public int getCurrentPage() {
            return this.currentPage;
        }

        /**
         * 获得下页页码
         */
        public int getNextPageNo() {
            return this.currentPage + 1;
        }

        /**
         * 取总页码
         */
        public int getTotalPageCount() {
            return this.totalPageCount;
        }

        public void setResult(List<?> result) {
            this.result = result;
        }

        public void setTotalSize(int totalSize) {
            this.totalSize = totalSize;
        }

        public void setCurrentPage(int currentPage) {
            this.currentPage = currentPage;
        }

        public void setCurrentPageSize(int currentPageSize) {
            this.currentPageSize = currentPageSize;
        }

        public void setPageMap(Map pageMap) {
            this.pageMap = pageMap;
        }

        public Map getPageMap() {
            pageMap = new HashMap();
            pageMap.put("currentPage", getCurrentPage());
            pageMap.put("pageSize", getPageSize());
            pageMap.put("totalPageCount", getTotalPageCount());
            pageMap.put("totalSize", getTotalSize());
            pageMap.put("list", getResult());
            return pageMap;
        }

}
