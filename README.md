# my first react project

------------

## 프로젝트 소개
> 리액트를 처음 접하는 사람이라면 To Do List를 만들어 보는것이 모든 리액트의 동작을 이해할 수 있는 좋은 기회라고 배웠습니다.
> 리액트에서의 CRUD 기능을 모두 구현보고 state로 데이터가 변경됨에따라 컴포넌트가 렌더링되는 상호작용을 이해할 수 있었습니다.

------------

## To Do List 기능 소개
### [현재 날짜 표시]

  상단에 현재 날짜가 표시되는 기능을 구현하였습니다.
  지금은 한 페이지로 구성된 애플리케이션이지만 달력 기능을 추가하여 어떤 날짜에 어떤 계획을 계획하고 완료했는지 확인하기위한 도구입니다.


### [진행률 확인]

  날짜 하단에 현재 목표의 진행률을 계산하는 컴포넌트를 구현하였습니다.
  계산식은 (완료 목록 갯수 / 전체 목록 갯수)로 완료버튼을 토글하거나, 항목을 삭제하거나, 항목을 추가할 때마다 진행률이 계산되도록 코드를 작성하였습니다.
  텍스트만 변경되면 심심한 느낌이 있어, 진행률이 강조되도록 회전 애니메이션을 추가하였습니다.


### [항목 추가하기]

  새로운 목표를 추가하는 컴포넌트입니다. 
  텍스트를 입력 후 추가하기 버튼을 클릭하거나 엔터키를 누르면 목록의 최하단에 새로운 목표가 추가됩니다.
  항목을 추가한 후 포커스는 새로입력하기창에 고정됩니다.


### [항목 상태별로 확인하기]

  새로운 항목을 추가하는 Form 바로 하단에 전체 / 진행중 / 완료 버튼이 있습니다.
  목표들의 완료상태를 기준으로 완료된 것과 미완료된 항목을 구분해서 확인할 수 있도록 필터버튼을 구현하였습니다.
  단, 목록이 수정중일때는 작동하지 않습니다.


### [할 일 목록의 항목들]

  - 항목의 완료상태 토글하기
    - 각 항목의 왼쪽 체크버튼이나 항목의 내용을 클릭하면 완료/미완료 상태로 토글이 가능합니다.

  - 항목 수정하기
    - 각 항목의 왼쪽 수정 버튼을 클릭하면 입력 필드에 수정 전 항목의 값이 표시되고 필드에 자동 포커스가 됩니다. value를 입력하지 않으면 저장하기 버튼이 비활성화 상태이며 값을 1글자 이상 입력하면 활성화됩니다.

  - 항목 삭제하기
    - 각 항목의 좌측 끝에 삭제 버튼을 클릭시 경고없이 항목이 삭제됩니다.
    삭제되는 항목은 width가 오른쪽에서 왼쪽으로 줄어들며 자연스럽게 화면에서 사라지도록 애니메이션을 추가하였습니다.


------------
  