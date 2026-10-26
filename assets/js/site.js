
document.addEventListener('DOMContentLoaded', function(){
  var y=document.getElementById('year'); if(y){y.textContent=new Date().getFullYear();}
  document.querySelectorAll('.thumb-strip button[data-target], .gallery-thumbs .thumb-btn[data-bs-slide-to]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var parent = this.parentElement; if(parent){ parent.querySelectorAll('.active').forEach(function(a){a.classList.remove('active');}); this.classList.add('active'); }
    });
  });
  document.querySelectorAll('[data-gallery-main]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var wrap=this.closest('[data-gallery-wrap]');
      if(!wrap) return;
      var main=wrap.querySelector('.gallery-main img');
      if(main){ main.src=this.dataset.galleryMain; main.alt=this.querySelector('img').alt || 'Gallery image'; }
      wrap.querySelectorAll('button').forEach(function(b){b.classList.remove('active')});
      this.classList.add('active');
    });
  });
});
