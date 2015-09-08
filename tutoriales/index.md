---
layout: page
title: Tutoriales
excerpt: "An archive of articles sorted by date."
search_omit: true
---

<ul class="post-list">
{% if site.categories.tutoriales %}
  {% for post in site.categories.tutoriales %}
    <li>
      <article>
        <a href="{{ site.url }}{{ post.url }}">
          {{ post.title }}
          <span class="entry-date">
            <time datetime="{{ post.date | date_to_xmlschema }}">
              {{ post.date | date: "%B %d, %Y" }}
            </time>
          </span>
          {% if post.excerpt %}
          <span class="excerpt">{{ post.excerpt }}</span>
          {% endif %}
        </a>
      </article>
    </li>
  {% endfor %}
{% else %}
  <div class="no-posts">
    <h4>Lo sentimos!, por el momento no hay tutoriales para mostrar.</h4>
  </div>
{% endif %}
</ul>
