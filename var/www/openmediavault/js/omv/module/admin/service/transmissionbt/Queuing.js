/**
 * Copyright (C) 2011-2012 Marcel Beck <marcel.beck@mbeck.org>
 * Copyright (C) 2013-2016 OpenMediaVault Plugin Developers
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// require("js/omv/WorkspaceManager.js")
// require("js/omv/workspace/form/Panel.js")

Ext.define('OMV.module.admin.service.transmissionbt.Queuing', {
    extend: 'OMV.workspace.form.Panel',

    rpcService: 'TransmissionBt',
    rpcGetMethod: 'getQueuingSettings',
    rpcSetMethod: 'setQueuingSettings',

    getFormItems: function() {
        return [{
            xtype: 'fieldset',
            title: _('Download queue'),
            defaults: {
                labelSeparator: ''
            },
            items: [{
                xtype: 'checkbox',
                name: 'download-queue-enabled',
                fieldLabel: _('Download'),
                checked: true,
                boxLabel: _('Transmission will only download download-queue-size non-stalled torrents at once.')
            }, {
                xtype: 'numberfield',
                name: 'download-queue-size',
                fieldLabel: _('Size'),
                allowDecimals: false,
                allowNegative: false,
                allowBlank: false,
                value: 5
            }]
        }, {
            xtype: 'fieldset',
            title: _('Queue stalled'),
            defaults: {
                labelSeparator: ''
            },
            items: [{
                xtype: 'checkbox',
                name: 'queue-stalled-enabled',
                fieldLabel: _('Queue stalled'),
                checked: true,
                boxLabel: _('Torrents that have not shared data for queue-stalled-minutes are treated as \'stalled\' and are not counted against the queue-download-size and seed-queue-size limits.')
            }, {
                xtype: 'numberfield',
                name: 'queue-stalled-minutes',
                fieldLabel: _('Stalled minutes'),
                allowDecimals: false,
                allowNegative: false,
                allowBlank: false,
                value: 30
            }]
        }, {
            xtype: 'fieldset',
            title: _('Seed queue'),
            defaults: {
                labelSeparator: ''
            },
            items: [{
                xtype: 'checkbox',
                name: 'seed-queue-enabled',
                fieldLabel: _('Seed'),
                checked: false,
                boxLabel: _('Transmission will only seed seed-queue-size non-stalled torrents at once.')
            }, {
                xtype: 'numberfield',
                name: 'seed-queue-size',
                fieldLabel: _('Size'),
                allowDecimals: false,
                allowNegative: false,
                allowBlank: false,
                value: 10
            }]
        }];
    }
});

OMV.WorkspaceManager.registerPanel({
    id: 'queuing',
    path: '/service/transmissionbt',
    text: _('Queuing'),
    position: 60,
    className: 'OMV.module.admin.service.transmissionbt.Queuing'
});
