const PartyModel = require('../models/Party');

const checkPartyBudget = (budget, services) => {

        const priceSum = services.reduce((sum, service) => sum + service.price, 0);

        if (priceSum > budget) {
            return false;
        }

        return true;
};

const partyController = {

    getAll: async(req, res) => {

        try {

            const parties = await PartyModel.find();

            res.json(parties);

        } catch (error) {
            console.log(`Error : ${error}`);
        }
    },

    create: async(req, res) => {
        try {
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services
            };

            if (party.services && !checkPartyBudget(party.budget, party.services)) {
                res.status(406).json({ msg: "Orçamento insuficiente." });
                return;
            }

            const response = await PartyModel.create(party);

            res.status(201).json({ response, msg: "Festa criada com sucesso!" });

        } catch (error) {
            console.log(`Error : ${error}`);
        }

    },

    get: async(req, res) => {

        try {

            const id = req.params.id;

            const party = await PartyModel.findById(id);

            if (!party) {
               res.status(404).json({ msg: "Festa não encontrada." });
               return;
            }

            res.json(party);

        } catch (error) {
            console.log(`Error : ${error}`);
        }
    },

    delete: async(req, res) => {
       
        try {

            const id = req.params.id;

            const party = await PartyModel.findById(id);

            if (!party) {
                res.status(404).json({ msg: "Festa não encontrada." });
                return;
            }

            const deletedParty = await PartyModel.findByIdAndDelete(id);

            res.status(200).json({ deletedParty, msg: "Festa removida com sucesso!" });


        } catch (error) {
            console.log(`Error : ${error}`);
        }
    },

    update: async(req, res) => {

        try {

            const id = req.params.id;

            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services
            };

            if (party.services && !checkPartyBudget(party.budget, party.services)) {
                res.status(406).json({ msg: "Orçamento insuficiente." });
                return;
            }

            const updateParty = await PartyModel.findByIdAndUpdate(id, party);

            if (!updateParty) {
                res.status(404).json({ msg: "Festa não encontrada." });
                return;
            }

            res.status(200).json({ party, msg: "Festa atualizada com sucesso!" });

        } catch (error) {
            console.log(`Error : ${error}`);
        }
    }
};

module.exports = partyController;