// fetch 方法需要返回条数总量: { total }，用来计算页数
// page 存放page相关的状态
// import { Tracker } from "@/service";
import React from 'react';
import useStateCallback from './useStateCallback';

export default function usePaper(props) {

    const { pageSize = 10, pageNo = 0, pageTotal = 0, fetch } = props;

    const [loading, setLoading] = useState(false);

    const [hasNext, setHasNext] = useState(true);

    const [page, setPage] = useStateCallback({
        total: pageTotal,
        page_no: pageNo,
        page_size: pageSize
    });

    const nextPage = async () => {

        if (!hasNext || loading) return;

        //上拉触底
        if (page.page_no > 0) {

        }

        setLoading(true);

        const { page_no, page_size } = page;
        const curPage = page_no + 1;

        const { total: fetchTotal } = await fetch({
            page_no: curPage,
            page_size
        })

        setLoading(false);

        if (!fetchTotal || curPage >= Math.ceil(+fetchTotal / page_size)) {
            setHasNext(false);
        }

        setPage({
            ...page,
            total: fetchTotal,
            page_no: curPage,
        })

    }

    const resetPage = (cb = () => { }) => {
        const resetPageParams = {
            ...(page || {}),
            page_no: 0,
            total: 0,
            isLoading: false,
            hasNext: true
        }
        setLoading(false);
        setHasNext(true);
        setPage(page,)
        this.setState(resetPageParams, cb)
    }

    return {
        
    } 
}