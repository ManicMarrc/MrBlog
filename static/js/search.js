const params = new URLSearchParams(window.location.search);
const query = params.get('query');

const idx = lunr(function () {
  this.ref('id');
  this.field('title', {
    boost: 15
  });
  this.field('description', {
    boost: 10
  });
  this.field('content', {
    boost: 5
  });
  this.field('tags');

  for (const key in window.store) {
    this.add({
     id: key,
     title: window.store[key].title,
     tags: window.store[key].tags,
     description: window.store[key].description,
     content: window.store[key].content
    });
  }
});

const results = idx.search(query);
if (results.length) {
  let resultList = '';
  for (const n in results) {
    const item = store[results[n].ref];
    resultList += '<li><p><a href="' + item.url + '">' + item.title + '</a></p>';
    resultList += '<p>' + item.description.replace('Introduction', '').substring(0, 150) + '</p></li>';
  }
  document.getElementById('result').innerHTML = resultList;
} else {
  document.getElementById('result').innerHTML = 'No results found!';
}
