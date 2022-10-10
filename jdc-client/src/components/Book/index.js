import { useEffect, useMemo, useState } from "react";
import { getAllBookPages, uploadBookPage } from "../../services/s3";

const BOOK_BASE_URL = 'https://jdc-bucket.s3.amazonaws.com/book';

const get3DigitNumber = (number) => {
  if (number < 10) return `00${number}`;
  if (number < 100) return `0${number}`;
  return number;
}

export const Book = () => {
  const [pages, setPages] = useState([]);

  const fetchPages = () => {
    getAllBookPages((err, data) => {
      if (err) return;


      setPages(data.map((page) => {
        const pageId = page.Key.split('/')[1].split('.')[0];
        return {
          id: pageId,
          url: `${BOOK_BASE_URL}/${pageId}.jpg`
        }
      }));
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPages();
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  
  const handleFileChange = (e) => {
    console.log(e.target.files);
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      uploadBookPage(file, get3DigitNumber(pages.length), (err, url) => {
        if(err) return;
        fetchPages();
      });
    }
  }

  return (
    <div>
      {pages.map((page) => (
        <img key={page.id}
             className="book-page"
             src={page.url} alt="book page"
             onError={e => e.target.style.display = 'none'}
        />
      ))}
      <input type="file" placeholder="Colabore" onChange={handleFileChange} multiple={false} accept="image/jpg"/>

    </div>
  );
};




