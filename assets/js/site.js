
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
  // Password-protected camera pages: custom dialog only, no browser prompt/alert.
  document.querySelectorAll('.camera-protected[data-password]').forEach(function(page){
      var expected=page.getAttribute('data-password').split(',').map(function(password){ return password.trim(); });
      var overlay=page.querySelector('.password-overlay');
      var content=page.querySelector('.protected-content');
      var form=page.querySelector('.password-form');
      var input=form ? form.querySelector('input[type="password"]') : null;
      var error=page.querySelector('.password-error');
      function showLocked(){
        if(overlay) overlay.style.display='flex';
        if(content) content.style.display='none';
        if(error) error.style.display='none';
        if(input) input.value='';
      }
      function unlock(){
        if(overlay) overlay.style.display='none';
        if(content) content.style.display='block';
        if(error) error.style.display='none';
      }
      showLocked();
      if(form){
        form.addEventListener('submit', function(e){
          e.preventDefault();
          var val=input ? input.value : '';
          if(expected.indexOf(val)!==-1){ unlock(); }
          else {
            if(error){ error.textContent='Incorrect password. Please try again.'; error.style.display='block'; }
            if(input){ input.focus(); input.select(); }
          }
        });
      }
  });
});
