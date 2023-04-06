import DefaultLayout from "@layouts/default-layout.component";

function ConfigPage() {
  return (
    <DefaultLayout
      heading="Configuraciones"
      drawerTitle="Menu"
      showMenu={true}
      isBackable={true}
    >

    </DefaultLayout>
  );
}

export default ConfigPage;
