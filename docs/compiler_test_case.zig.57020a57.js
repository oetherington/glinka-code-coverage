var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const Arena = std.heap.ArenaAllocator;"},
{"lineNum":"   20","line":"const Compiler = @import(\"compiler.zig\").Compiler;"},
{"lineNum":"   21","line":"const Backend = @import(\"../common/backend.zig\").Backend;"},
{"lineNum":"   22","line":"const node = @import(\"../common/node.zig\");"},
{"lineNum":"   23","line":"const Node = node.Node;"},
{"lineNum":"   24","line":"const NodeType = node.NodeType;"},
{"lineNum":"   25","line":"const Config = @import(\"../common/config.zig\").Config;"},
{"lineNum":"   26","line":"const TsParser = @import(\"../frontend/ts_parser.zig\").TsParser;"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"pub const NopBackend = struct {"},
{"lineNum":"   29","line":"    backend: Backend,"},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"    pub fn new() NopBackend {","class":"lineCov","hits":"1","order":"144","possible_hits":"1",},
{"lineNum":"   32","line":"        var callbacks: Backend.Callbacks = undefined;","class":"lineCov","hits":"1","order":"145","possible_hits":"1",},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"        inline for (std.meta.fields(Backend.Callbacks)) |field| {"},
{"lineNum":"   35","line":"            @field(callbacks, field.name) = switch (field.field_type) {"},
{"lineNum":"   36","line":"                Backend.Callback => NopBackend.nopCallback,","class":"lineCov","hits":"1","order":"146","possible_hits":"1",},
{"lineNum":"   37","line":"                Backend.NodeCallback => NopBackend.nopNodeCallback,","class":"lineCov","hits":"1","order":"147","possible_hits":"1",},
{"lineNum":"   38","line":"                else => @compileError(\"Unimplemented NOP backend callback\"),"},
{"lineNum":"   39","line":"            };"},
{"lineNum":"   40","line":"        }"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"        return NopBackend{","class":"lineCov","hits":"1","order":"149","possible_hits":"1",},
{"lineNum":"   43","line":"            .backend = .{"},
{"lineNum":"   44","line":"                .callbacks = callbacks,","class":"lineCov","hits":"1","order":"148","possible_hits":"1",},
{"lineNum":"   45","line":"            },"},
{"lineNum":"   46","line":"        };"},
{"lineNum":"   47","line":"    }"},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"    fn nopCallback(be: *Backend) Backend.Error!void {","class":"lineCov","hits":"2","order":"4283","possible_hits":"2",},
{"lineNum":"   50","line":"        _ = be;"},
{"lineNum":"   51","line":"    }"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    fn nopNodeCallback(be: *Backend, nd: Node) Backend.Error!void {","class":"lineCov","hits":"2","order":"4320","possible_hits":"2",},
{"lineNum":"   54","line":"        _ = be;"},
{"lineNum":"   55","line":"        _ = nd;"},
{"lineNum":"   56","line":"    }"},
{"lineNum":"   57","line":"};"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"pub const CompilerTestCase = struct {"},
{"lineNum":"   60","line":"    const Error = error{ TestUnexpectedResult, TestExpectedEqual };"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"    code: []const u8,"},
{"lineNum":"   63","line":"    check: fn ("},
{"lineNum":"   64","line":"        case: CompilerTestCase,"},
{"lineNum":"   65","line":"        cmp: Compiler,"},
{"lineNum":"   66","line":"    ) anyerror!void = CompilerTestCase.checkNoErrors,"},
{"lineNum":"   67","line":"    setup: ?fn (cmp: Compiler) anyerror!void = null,"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"    pub fn run(comptime self: @This()) !void {","class":"lineCov","hits":"150","order":"4251","possible_hits":"150",},
{"lineNum":"   70","line":"        var arena = Arena.init(std.testing.allocator);","class":"lineCov","hits":"50","order":"4252","possible_hits":"50",},
{"lineNum":"   71","line":"        defer arena.deinit();","class":"linePartCov","hits":"50","order":"4342","possible_hits":"301",},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"        var tsParser = TsParser.new(&arena, self.code);","class":"lineCov","hits":"50","order":"4253","possible_hits":"50",},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"        var parser = tsParser.getParser();","class":"lineCov","hits":"50","order":"4254","possible_hits":"50",},
{"lineNum":"   76","line":""},
{"lineNum":"   77","line":"        const res = parser.getAst(&arena);","class":"lineCov","hits":"50","order":"4255","possible_hits":"50",},
{"lineNum":"   78","line":"        try res.reportIfError(std.io.getStdErr().writer());","class":"linePartCov","hits":"50","order":"4269","possible_hits":"100",},
{"lineNum":"   79","line":"        try self.expect(res.isSuccess());","class":"linePartCov","hits":"50","order":"4270","possible_hits":"100",},
{"lineNum":"   80","line":"        try self.expectEqual(NodeType.Program, res.Success.getType());","class":"linePartCov","hits":"100","order":"4273","possible_hits":"150",},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"        const config = Config{};"},
{"lineNum":"   83","line":""},
{"lineNum":"   84","line":"        var backend = NopBackend.new();","class":"lineCov","hits":"50","order":"4277","possible_hits":"50",},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"        var compiler = Compiler.new(","class":"lineCov","hits":"50","order":"4278","possible_hits":"50",},
{"lineNum":"   87","line":"            std.testing.allocator,"},
{"lineNum":"   88","line":"            &config,"},
{"lineNum":"   89","line":"            &backend.backend,","class":"lineCov","hits":"1","order":"4423","possible_hits":"1",},
{"lineNum":"   90","line":"        );"},
{"lineNum":"   91","line":"        defer compiler.deinit();","class":"linePartCov","hits":"50","order":"4341","possible_hits":"151",},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"        if (self.setup) |setup|"},
{"lineNum":"   94","line":"            try setup(compiler);","class":"linePartCov","hits":"1","order":"4424","possible_hits":"2",},
{"lineNum":"   95","line":""},
{"lineNum":"   96","line":"        try compiler.compileProgramNode(res.Success);","class":"linePartCov","hits":"100","order":"4279","possible_hits":"150",},
{"lineNum":"   97","line":""},
{"lineNum":"   98","line":"        try self.check(self, compiler);","class":"linePartCov","hits":"50","order":"4336","possible_hits":"100",},
{"lineNum":"   99","line":"    }"},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"    pub fn expect(self: CompilerTestCase, ok: bool) Error!void {","class":"lineCov","hits":"2","order":"4271","possible_hits":"2",},
{"lineNum":"  102","line":"        _ = self;"},
{"lineNum":"  103","line":"        try std.testing.expect(ok);","class":"lineCov","hits":"1","order":"4272","possible_hits":"1",},
{"lineNum":"  104","line":"    }"},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"    pub fn expectEqual(","class":"lineCov","hits":"6","order":"4274","possible_hits":"6",},
{"lineNum":"  107","line":"        self: CompilerTestCase,"},
{"lineNum":"  108","line":"        expected: anytype,"},
{"lineNum":"  109","line":"        actual: @TypeOf(expected),"},
{"lineNum":"  110","line":"    ) Error!void {","class":"lineCov","hits":"6","order":"4276","possible_hits":"6",},
{"lineNum":"  111","line":"        _ = self;"},
{"lineNum":"  112","line":"        try std.testing.expectEqual(expected, actual);","class":"lineCov","hits":"6","order":"4275","possible_hits":"6",},
{"lineNum":"  113","line":"    }"},
{"lineNum":"  114","line":""},
{"lineNum":"  115","line":"    pub fn expectEqualStrings(","class":"lineCov","hits":"1","order":"4485","possible_hits":"1",},
{"lineNum":"  116","line":"        self: CompilerTestCase,"},
{"lineNum":"  117","line":"        expected: []const u8,"},
{"lineNum":"  118","line":"        actual: []const u8,"},
{"lineNum":"  119","line":"    ) Error!void {","class":"lineCov","hits":"1","order":"4487","possible_hits":"1",},
{"lineNum":"  120","line":"        _ = self;"},
{"lineNum":"  121","line":"        try std.testing.expectEqualStrings(expected, actual);","class":"lineCov","hits":"1","order":"4486","possible_hits":"1",},
{"lineNum":"  122","line":"    }"},
{"lineNum":"  123","line":""},
{"lineNum":"  124","line":"    pub fn checkNoErrors(self: CompilerTestCase, cmp: Compiler) anyerror!void {","class":"lineCov","hits":"2","order":"4337","possible_hits":"2",},
{"lineNum":"  125","line":"        const hasErrors = cmp.hasErrors();","class":"lineCov","hits":"1","order":"4338","possible_hits":"1",},
{"lineNum":"  126","line":"        if (hasErrors)","class":"linePartCov","hits":"1","order":"4339","possible_hits":"2",},
{"lineNum":"  127","line":"            try cmp.reportErrors();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  128","line":"        try self.expect(!hasErrors);","class":"lineCov","hits":"1","order":"4340","possible_hits":"1",},
{"lineNum":"  129","line":"    }"},
{"lineNum":"  130","line":"};"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-14 09:28:45", "instrumented" : 37, "covered" : 36,};
var merged_data = [];
