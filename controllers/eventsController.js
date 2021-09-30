const { response, request } = require("express")
const Event = require("../models/Event")

const eventsController = {

    getEvents: async (req = request, res = response) => {

        try {
            const events = await Event.find({ user: req.body.id }).populate('user', 'name')
            return res.status(500).json({ ok: false, events })

        } catch (error) {
            return res.status(500).json({ ok: false, message: 'error obteniendo eventos' })

        }

    },
    createEvent: async (req = request, res = response) => {
        try {
            const event = new Event(req.body)
            event.user = req.body.id
            const eventSaved = await event.save()
            if (!eventSaved) {

                return res.status(500).json({ ok: false, message: 'error creando nota' })
            }
            return res.status(200).json({ ok: true, eventSaved })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: false, message: 'error creando nota' })

        }

    },
    updateEvent: async (req = request, res = response) => {

        try {
            const id = req.params.id

            const event = await Event.findById(id)

            if (!event) return res.status(404).json({ ok: true, message: 'no se encuentra' })

            if (event.user.toString() != req.body.id) {
                return res.status(404).json({ ok: true, message: 'no tiene privilegios' })
            }
            const newEvent = {
                ...req.body,
                user: req.body.id
            }

            const eventUpdated = await Event.findByIdAndUpdate(id, newEvent, { new: true })

            return res.status(200).json({ ok: true, eventUpdated })


        } catch (error) {

            return res.status(500).json({ ok: true, message: 'error actualizando' })
        }

    },
    deleteEvent: async (req = request, res = response) => {

        try {

            const id = req.params.id

            const event = await Event.findById(id)
            if (!event) return res.status(404).json({ ok: true, message: 'no se encuentra' })


            if (event.user.toString() != req.body.id) {
                return res.status(404).json({ ok: true, message: 'no tiene privilegios' })
            }

            const eventDeleted = await Event.findByIdAndDelete(id)

            res.status(200).json({ ok: true, eventDeleted })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: true, message: 'error borrando' })

        }

    }
}

module.exports = eventsController