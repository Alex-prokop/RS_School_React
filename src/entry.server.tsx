import { createRequestHandler } from '@remix-run/express';
import express from 'express';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { RemixServer } from '@remix-run/react';

const app = express();
app.use(express.static(path.join(__dirname, '../public')));

app.all(
  '*',
  createRequestHandler({
    getLoadContext() {
      return {};
    },
    render(req, res) {
      const markup = renderToString(<RemixServer context={{}} url={req.url} />);
      res.set('Content-Type', 'text/html').send(`<!DOCTYPE html>${markup}`);
    },
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
