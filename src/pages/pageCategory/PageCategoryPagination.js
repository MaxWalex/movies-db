import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from '@mui/material';

function PageCategoryPagination({data, status, handleClickPagination, pageRouter, pathName}) {

    let totalPages = data.total_pages >= 500 ? 500 : data.total_pages;

  return (
    <div className='category_pagination'>
        {status === 'fulfilled' && <Pagination 
            defaultPage={+pageRouter} 
            page={+pageRouter}
            onChange={(_, num) => handleClickPagination(num)} 
            count={totalPages} 
            color="secondary" 
            size="large" 
            renderItem={(item) => (
                <PaginationItem 
                    component={Link}
                    to={`${pathName}/page/${item.page}`}
                    {...item}
                />
            )} 
        />}
       
    </div>
  )
}

export default PageCategoryPagination