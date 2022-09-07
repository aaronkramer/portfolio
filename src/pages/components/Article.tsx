import * as React from 'react';
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';


interface HtmlBody {
  html: string
}
// lets let images be refs directly to the S3 bucket
interface Article {
  id: string,
  title: string,
  article: string,
}

const Article = (article: Article) => {
  return (
    <>
      <div style={{ textAlign: 'center', alignItems: 'center', display: 'inline-block', width: '60%' }}>
          <Box key={article.id}>
            <Paper elevation={2}>
              <Typography variant='h3' style={{ textAlign: 'center' }}>{article.title}</Typography>
              <Typography variant='h6' style={{ textAlign: 'left' }}>{parse(article.article.html)}</Typography>
            </Paper>
          </Box>
      </div>
    </div>
    </>
  );
};

export default Article;
