import $ from "jquery";

$(document).ready(() => {
  console.log("is in!");
  /* Настройки */
  const mainClass = `block-s`;
  /* Настройки КОНЕЦ*/

  const $menuCollection = $(`.${mainClass}`);
  $menuCollection.each((idx, item) => {
    const $menu = $(item);

    const $parent = $menu.parent(".page__menu");
    let mobileSize = $(item).attr("data-adaptive-width");
    const $inner = $menu.children(`.${mainClass}__inner`);
    const $body = $inner.children(`.${mainClass}__body`);
    const $controller = $menu.find(`.${mainClass}__controller`);
    const $closer = $menu.find(`.${mainClass}__closer`);
    const $link = $menu.find(`.${mainClass}__link`);

    
    /*const $outerMenuBlock = $(".menu-info");*/
    clearClassAndStyle($menu, $body, mainClass, mobileSize);
    controllMenu($controller, mainClass, mobileSize);
    controllMenu($link, mainClass, mobileSize);
    closeOutsideMenu($body, mainClass);
    adaptiveMode(mobileSize, $body);
    offsetBody($parent, $body, mobileSize);

    $(window).resize(() => {
      mobileSize = $(item).attr("data-adaptive-width");
      clearClassAndStyle($menu, $body, mainClass, mobileSize);
      adaptiveMode(mobileSize, $body);
      offsetBody($parent, $body, mobileSize);
      controllMenu($controller, mainClass);
    });

    /*  $closer.on("click", () => {
      console.log("click");
      console.log($controller, mainClass, mobileSize);
      controllMenu($controller, mainClass, mobileSize);
    }); */
  });
});

const checkMobileMode = (mobileSize) => {
  let width = getSize();
  if (width < mobileSize) {
    return true;
  }
  return false;
};

const offsetBody = ($inner, $body, mobileSize) => {
  const mode = checkMobileMode(mobileSize);
  let width = getSize();
  if (mode) {
    const height = $inner.outerHeight();
    $body.css({ top: height });
  } else {
    $body.css({ top: "auto" });
  }
};

const adaptiveMode = (mobileSize, $body) => {
  const mode = checkMobileMode(mobileSize);
  if (!mode) {
    $body.css({ position: "relative", transform: "translateX(0)" });
  } else {
    $body.removeAttr("style");
  }
};

const closeMenu = ($menu, mainClass) => {
  const [curretnClass] = $menu.attr("class").split(/\s+/);
  const $controllerIcon = $menu.find(`.icon_burger`);
  const $controllerText = $menu.find(`.${curretnClass}__controller-text`);

  if ($menu.hasClass(`${mainClass}_open`)) {
    bodyOverRemoveClass();
    $menu.removeClass(`${mainClass}_open`);
    $menu.addClass(`${mainClass}_close`);
    $controllerIcon.removeClass(`icon_burger_active`);
    $controllerText.removeClass(`${curretnClass}__controller-text_active`);
  } else {
    bodyOverAddClass();
    $menu.removeClass(`${mainClass}_close`);
    $menu.addClass(`${mainClass}_open`);
    $controllerIcon.addClass(`icon_burger_active`);
    $controllerText.addClass(`${curretnClass}__controller-text_active`);
  }
};
const controllMenu = ($controller, mainClass, mobileSize) => {
  $controller.on("click", (e) => {
    e.stopPropagation();
    const mode = checkMobileMode(mobileSize);

    if (mode) {
      const $currentMenu = $(e.target).closest(`.${mainClass}`);
      closeMenu($currentMenu, mainClass);
    }
  });
};

const closeOutsideMenu = ($body, mainClass) => {
  $body.on("click", (e) => {
    e.stopPropagation();
  });

  $("html").click(function () {
    const $openMenu = $(`.${mainClass}_open`);
    $openMenu.each(function (_, item) {
      const $currentMenu = $(item);
      closeMenu($currentMenu, mainClass);
      /*$(item).hasClass(`${mainClass}_open`) &&
				$(item).removeClass(`${mainClass}_open`) &&
				$(item).addClass(`${mainClass}_close`);*/
    });
  });
};

const bodyOverAddClass = () => {
  $(".page").addClass("page_overflow");
};
const bodyOverRemoveClass = () => {
  $(".page").removeClass("page_overflow");
};

const clearClassAndStyle = ($menu, $body, mainClass, mobileSize) => {
  let width = getSize();
  if (width >= mobileSize) {
    if ($menu.hasClass(`${mainClass}_close`)) {
      $menu.removeClass(`${mainClass}_close`);
    }

    if ($menu.hasClass(`${mainClass}_open`)) {
      $menu.removeClass(`${mainClass}_open`);
    }

    $body.removeAttr("style");
  }
};

const getSize = () => $(window).width();
