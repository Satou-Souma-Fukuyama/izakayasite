/*　開け閉め　*/
document.addEventListener("DOMContentLoaded", () => {
  const titles = document.querySelectorAll(".toggle-title");

  titles.forEach(title => {
    title.addEventListener("click", () => {
      title.classList.toggle("active");

      const content = title.nextElementSibling;
      if (content) {
        content.style.display =
          content.style.display === "block" ? "none" : "block";
      }
    });
  });
});

/* メニュー検索　*/
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("menuSearch");
    const clearBtn = document.getElementById("clearSearch");
    const menuItems = document.querySelectorAll(".menu-list li");
    const noResult = document.getElementById("noResult");
    const hitCount = document.getElementById("hitCount");
    const toggleTitles = document.querySelectorAll(".toggle-title");

    function updateSearch() {
        const keyword = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        // いったん全折りたたみを閉じる
        toggleTitles.forEach(title => {
            title.classList.remove("active");
            title.nextElementSibling.style.display = "none";
        });

        menuItems.forEach(item => {
            const nameSpan = item.querySelector("span:first-child");
            const originalText = nameSpan.textContent;
            const lowerText = originalText.toLowerCase();

            // いったん元に戻す
            nameSpan.innerHTML = originalText;


            if (keyword && lowerText.includes(keyword)) {
                // ハイライト
                const regex = new RegExp(`(${keyword})`, "gi");
                nameSpan.innerHTML = originalText.replace(
                    regex,
                    `<span class="highlight">$1</span>`
                );


                item.style.display = "";
                visibleCount++;

                // 親の折りたたみを自動で開く
                const content = item.closest(".toggle-content");
                if (content) {
                    content.style.display = "block";
                    content.previousElementSibling.classList.add("active");
                }
            }
            else if (!keyword) {
                item.style.display = "";
            }
            else {
                item.style.display = "none";
            }
        });

        clearBtn.style.display = keyword ? "inline-block" : "none";

        if (keyword && visibleCount === 0) {
            noResult.style.display = "block";
        } else {
            noResult.style.display = "none";
        }

    }

    searchInput.addEventListener("input", updateSearch);

    clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        updateSearch();
    });
});



/* スクロール　*/

document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider"); // ★ div
    const track = document.getElementById("autoSlider"); // ★ ul
    const speed = 0.5;

    // 中身を複製
    track.innerHTML += track.innerHTML;

    function autoScroll() {
        slider.scrollLeft += speed;

        if (slider.scrollLeft >= track.scrollWidth / 2) {
            slider.scrollLeft = 0;
        }

        requestAnimationFrame(autoScroll);
    }

    autoScroll();
});







