import { SementeService } from "../services/SementeService";
import { ArmazenamentoSementeService } from "../services/ArmazenamentoSementeService";
import { PlantioSementeService } from "../services/PlantioSementeService";

class SementesController {
  async inserirEditar(sementes, plantios) {
    const service = new SementeService();
    const armazenamentoSementeService = new ArmazenamentoSementeService();
    const plantioSementeService = new PlantioSementeService();

    // console.log(sementes);

    for await (const i of sementes) {
      const {
        nome,
        outros_nomes,
        imagem,
        especie,
        origem,
        observacao,
        data,
        dias_colheita,
        id,
        edit = false,
      } = i;
      let sementeCreate: any = { id };

      if (Number(id || "") > 0) {
        if (edit) {
          sementeCreate = await service.update({
            nome,
            outros_nomes,
            imagem,
            especie,
            origem,
            observacao,
            data,
            dias_colheita,
            id,
          });
        }
      } else {
        sementeCreate = await service.create({
          nome,
          outros_nomes,
          imagem,
          especie,
          origem,
          observacao,
          data,
          dias_colheita,
        });
      }

      for await (const a of i.armazenamento) {
        const {
          id,
          edit = false,
          semente,
          quantidade,
          local_armazenamento,
          tratamento,
          observacao,
          data,
          data_proximo_plantio,
        } = a;

        if (id > 0) {
          if (edit) {
            await armazenamentoSementeService.update({
              semente,
              quantidade,
              local_armazenamento,
              tratamento,
              observacao,
              data,
              data_proximo_plantio,
            });
          }
        } else {
          console.log(sementeCreate);
          await armazenamentoSementeService.create({
            semente: sementeCreate.id,
            quantidade,
            local_armazenamento,
            tratamento,
            observacao,
            data,
            data_proximo_plantio: data_proximo_plantio,
          });
        }
      }
    }

    for await (const i of plantios) {
      const {
        edit = false,
        id,
        semente,
        quantidade,
        data,
        armazenamento,
        data_colheita,
        observacao,
      } = i;
      //   console.log(i);

      if (Number(id || "") > 0) {
        if (edit) {
          await plantioSementeService.update({
            semente,
            quantidade,
            armazenamento,
            data_colheita,
            observacao,
            id,
            data,
          });
        }
      } else {
        await plantioSementeService.create({
          semente,
          quantidade,
          armazenamento,
          data_colheita,
          observacao,
          data,
        });
      }
    }
    return true;
  }

  async listar() {
    const sementeService = new SementeService();
    const armazenamentoSementeService = new ArmazenamentoSementeService();
    const plantioSementeService = new PlantioSementeService();

    const sementes = await sementeService.list();
    const armazenamentos = await armazenamentoSementeService.list();
    const plantios = await plantioSementeService.list();

    //  const group = arrayGroupBy(armazenamentos,'semente');
    let sementesf = [];
    for await (const i of sementes) {
      const filter = armazenamentos.filter((f) => f.semente === i.id);
      sementesf.push({
        ...i,
        armazenamento: filter,
      });
    }
    return {
      sementes: sementesf,
      plantios,
    };
  }
}

export { SementesController };
